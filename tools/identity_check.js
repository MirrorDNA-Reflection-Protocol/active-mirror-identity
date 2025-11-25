#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const HANDLE = '~active-mirror-paul';
const IDENTITY_FILES = new Set([
  'BOOT.md',
  'INJECT.md',
  'IDENTITY_STORY.md',
  'IDENTITY_STORY_MINIFIED.md',
  'identity_capsule.jsonld',
  'README.md',
  'identity.json',
  'llms.txt',
  'now.md',
  'paul_desai_active_mirror.md',
  path.join('spec', 'Reflection_Chain_Manifest_v1.0.md'),
  'schema.jsonld',
  'system.md'
]);
const MD_EXTENSIONS = new Set(['.md', '.markdown']);
const JSON_EXTENSIONS = new Set(['.json', '.jsonld']);
const TEXT_EXTENSIONS = new Set(['.txt']);
const LICENSE_FILE = 'LICENSE';
const IGNORE_DIRS = new Set(['.git', 'node_modules', '.github']);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walk(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function checkMarkdown(filePath, content, issues) {
  if (!/^VaultID:\s*AMOS:\/\//im.test(content)) {
    issues.push(`${filePath}: missing or invalid VaultID marker`);
  }
  if (!/^(glyphsig|GlyphSig):\s*\S+/im.test(content)) {
    issues.push(`${filePath}: missing glyph signature marker`);
  }
}

function checkJson(filePath, content, issues) {
  try {
    const data = JSON.parse(content);
    const id = data['@id'] || data.id || (data.identity && data.identity.handle);
    if (!id || !String(id).includes(HANDLE)) {
      issues.push(`${filePath}: @id/id/handle does not reference ${HANDLE}`);
    }
  } catch (err) {
    issues.push(`${filePath}: invalid JSON (${err.message})`);
  }
}

function checkLicense(rootDir, issues) {
  const licensePath = path.join(rootDir, LICENSE_FILE);
  if (!fs.existsSync(licensePath)) {
    issues.push('LICENSE: file missing');
    return;
  }
  const content = fs.readFileSync(licensePath, 'utf8');
  if (!/MIT License/i.test(content)) {
    issues.push('LICENSE: MIT license section missing');
  }
  if (!/CC-BY-ND/i.test(content)) {
    issues.push('LICENSE: CC-BY-ND identity spec section missing');
  }
}

function runChecks(rootDir) {
  const issues = [];
  const files = walk(rootDir);
  const identityFiles = files.filter((file) => {
    const relative = path.relative(rootDir, file);
    if (!IDENTITY_FILES.has(relative)) return false;
    const ext = path.extname(file).toLowerCase();
    return MD_EXTENSIONS.has(ext) || JSON_EXTENSIONS.has(ext) || TEXT_EXTENSIONS.has(ext);
  });

  for (const filePath of identityFiles) {
    const content = fs.readFileSync(filePath, 'utf8');
    const ext = path.extname(filePath).toLowerCase();
    if (MD_EXTENSIONS.has(ext) || TEXT_EXTENSIONS.has(ext)) {
      checkMarkdown(path.relative(rootDir, filePath), content, issues);
    } else if (JSON_EXTENSIONS.has(ext)) {
      checkJson(path.relative(rootDir, filePath), content, issues);
    }
  }

  checkLicense(rootDir, issues);
  return { issues, checked: identityFiles.map((file) => path.relative(rootDir, file)) };
}

function main() {
  const rootDir = path.resolve(__dirname, '..');
  const { issues, checked } = runChecks(rootDir);
  console.log(`Identity artefacts checked: ${checked.length}`);
  checked.forEach((file) => console.log(`- ${file}`));

  if (issues.length > 0) {
    console.error('\nIdentity verification failed:');
    issues.forEach((issue) => console.error(`- ${issue}`));
    process.exit(1);
  }

  console.log('\nIdentity verification passed.');
}

if (require.main === module) {
  main();
}

module.exports = { runChecks };
