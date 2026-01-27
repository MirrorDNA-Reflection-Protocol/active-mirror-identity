#!/usr/bin/env node
/**
 * MIRROR SEED — Demo Seeding Script
 *
 * Generates seeds from all 6 templates, shares each via API,
 * and saves metadata + URLs for marketing use.
 *
 * Usage: node scripts/demo-seed.js
 * Output: marketing/seeds/demo-seeds.json
 */
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BASE = 'https://id.activemirror.ai';
const PROXY = 'https://proxy.activemirror.ai';
const OUTPUT_DIR = path.join(__dirname, '..', 'marketing', 'seeds');
const TEMPLATES = ['Developer', 'Writer', 'Executive', 'Student', 'Parent', 'Founder'];

async function run() {
  console.log('⟡ MIRROR SEED Demo Seeder\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    permissions: ['clipboard-read', 'clipboard-write'],
  });

  const results = [];

  for (const template of TEMPLATES) {
    console.log(`  Generating: ${template}...`);
    const page = await context.newPage();
    await page.goto(BASE);
    await page.waitForLoadState('networkidle');

    // Apply template
    await page.locator(`.template-card:has-text("${template}")`).click();
    await page.waitForTimeout(300);

    // Capture the filled form values
    const name = await page.locator('#userName').inputValue();
    const role = await page.locator('#userRole').inputValue();

    // Generate
    await page.click('button:has-text("Generate My MIRROR SEED")');
    await page.waitForSelector('#output-container.visible');

    // Get raw output
    const seedContent = await page.locator('#output').textContent();

    // Share via API
    let shareData = null;
    try {
      const res = await fetch(`${PROXY}/seed/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: seedContent }),
      });
      shareData = await res.json();
      console.log(`    ✓ Shared: ${shareData.url}`);
    } catch (e) {
      console.log(`    ✗ Share failed: ${e.message}`);
    }

    results.push({
      template,
      name,
      role,
      shortcode: shareData?.shortcode || null,
      url: shareData?.url || null,
      contentLength: seedContent.length,
      generatedAt: new Date().toISOString(),
    });

    await page.close();
  }

  // Also generate some variations — same templates but with platform-specific formatting
  console.log('\n  Generating platform-formatted variants...');
  const formats = ['chatgpt', 'claude', 'gemini'];
  for (const fmt of formats) {
    const page = await context.newPage();
    await page.goto(BASE);
    await page.waitForLoadState('networkidle');

    // Use Founder template for all platform variants
    await page.locator('.template-card:has-text("Founder")').click();
    await page.waitForTimeout(300);
    await page.click('button:has-text("Generate My MIRROR SEED")');
    await page.waitForSelector('#output-container.visible');

    // Switch format
    const fmtLabel = fmt === 'chatgpt' ? 'ChatGPT' : fmt === 'claude' ? 'Claude' : 'Gemini';
    await page.locator(`.format-opt:has-text("${fmtLabel}")`).click();
    await page.waitForTimeout(300);

    const content = await page.locator('#output').textContent();

    // Share
    let shareData = null;
    try {
      const res = await fetch(`${PROXY}/seed/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      shareData = await res.json();
      console.log(`    ✓ ${fmtLabel} format shared: ${shareData.url}`);
    } catch (e) {
      console.log(`    ✗ Share failed: ${e.message}`);
    }

    results.push({
      template: `Founder (${fmtLabel} format)`,
      name: 'Riya Patel',
      role: 'Founder & CEO',
      format: fmt,
      shortcode: shareData?.shortcode || null,
      url: shareData?.url || null,
      contentLength: content.length,
      generatedAt: new Date().toISOString(),
    });

    await page.close();
  }

  await browser.close();

  // Save results
  const outputPath = path.join(OUTPUT_DIR, 'demo-seeds.json');
  fs.writeFileSync(outputPath, JSON.stringify({ generated: new Date().toISOString(), count: results.length, seeds: results }, null, 2));
  console.log(`\n⟡ Done. ${results.length} seeds generated and shared.`);
  console.log(`  Saved to: ${outputPath}`);

  // Print summary table
  console.log('\n  Template            | Name             | URL');
  console.log('  ' + '-'.repeat(70));
  for (const r of results) {
    const tmpl = (r.template || '').padEnd(20);
    const name = (r.name || '').padEnd(17);
    console.log(`  ${tmpl}| ${name}| ${r.url || 'N/A'}`);
  }
}

run().catch(console.error);
