const fs = require('fs');
const os = require('os');
const path = require('path');
const { runChecks } = require('../tools/identity_check');

describe('identity_check', () => {
  function createTempRepo(structure) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'identity-check-'));
    for (const [relativePath, content] of Object.entries(structure)) {
      const fullPath = path.join(dir, relativePath);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, content, 'utf8');
    }
    return dir;
  }

  it('passes when identity artefacts include VaultID, GlyphSig, and handle references', () => {
    const repo = createTempRepo({
      'identity.md': 'VaultID: AMOS://valid\nGlyphSig: test',
      'identity.json': JSON.stringify({ '@id': `https://example.com/${'~active-mirror-paul'}` }),
      LICENSE: 'MIT License\nCC-BY-ND'
    });

    const { issues } = runChecks(repo);
    expect(issues).toHaveLength(0);
  });

  it('flags missing provenance markers and handle references', () => {
    const repo = createTempRepo({
      'broken.md': 'GlyphSig: missing-vault',
      'broken.json': JSON.stringify({ '@id': 'https://example.com/identity' }),
      LICENSE: 'MIT License only'
    });

    const { issues } = runChecks(repo);
    expect(issues.length).toBeGreaterThanOrEqual(3);
    expect(issues).toEqual(expect.arrayContaining([
      expect.stringContaining('missing or invalid VaultID'),
      expect.stringContaining('@id/id/handle does not reference'),
      expect.stringContaining('CC-BY-ND identity spec section missing')
    ]));
  });
});
