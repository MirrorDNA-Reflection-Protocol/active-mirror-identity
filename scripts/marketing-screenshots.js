#!/usr/bin/env node
/**
 * MIRROR SEED — Marketing Screenshot Generator
 *
 * Captures pixel-perfect screenshots of every product state.
 * Ready for Product Hunt, Twitter, blog posts, pitch decks.
 *
 * Usage: node scripts/marketing-screenshots.js
 * Output: marketing/screenshots/
 */
const { chromium } = require('@playwright/test');
const path = require('path');

const BASE = 'https://id.activemirror.ai';
const OUT = path.join(__dirname, '..', 'marketing', 'screenshots');

const VIEWPORTS = {
  desktop: { width: 1280, height: 800 },
  mobile: { width: 390, height: 844 },
};

async function shot(page, name, opts = {}) {
  const p = path.join(OUT, `${name}.png`);
  await page.screenshot({ path: p, fullPage: opts.full || false });
  console.log(`  ✓ ${name}.png`);
}

async function run() {
  console.log('⟡ MIRROR SEED Marketing Screenshots\n');

  // ═══ DESKTOP SCREENSHOTS ═══
  console.log('Desktop (1280x800):');
  const browser = await chromium.launch({ headless: true });
  let context = await browser.newContext({
    viewport: VIEWPORTS.desktop,
    permissions: ['clipboard-read', 'clipboard-write'],
  });

  let page = await context.newPage();
  await page.goto(BASE);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  // 1. Hero — full landing
  await shot(page, '01-hero-landing');

  // 2. Full page scroll
  await shot(page, '02-full-page', { full: true });

  // 3. Template selector visible
  await page.locator('#generator').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await shot(page, '03-template-selector');

  // 4. Developer template applied
  await page.locator('.template-card:has-text("Developer")').click();
  await page.waitForTimeout(500);
  await shot(page, '04-developer-template-filled');

  // 5. Generate output — Universal
  await page.click('button:has-text("Generate My MIRROR SEED")');
  await page.waitForSelector('#output-container.visible');
  await page.waitForTimeout(500);
  await page.locator('#output').scrollIntoViewIfNeeded();
  await shot(page, '05-generated-universal');

  // 6. ChatGPT format
  await page.locator('.format-opt:has-text("ChatGPT")').click();
  await page.waitForTimeout(300);
  await shot(page, '06-generated-chatgpt');

  // 7. Claude format
  await page.locator('.format-opt:has-text("Claude")').click();
  await page.waitForTimeout(300);
  await shot(page, '07-generated-claude');

  // 8. Gemini format
  await page.locator('.format-opt:has-text("Gemini")').click();
  await page.waitForTimeout(300);
  await shot(page, '08-generated-gemini');

  // 9. Back to Universal with output actions visible
  await page.locator('.format-opt:has-text("Universal")').click();
  await page.waitForTimeout(300);
  await page.locator('.output-actions').scrollIntoViewIfNeeded();
  await shot(page, '09-output-actions-buttons');

  // 10. Toast notification (after copy)
  await page.click('button:has-text("Copy")');
  await page.waitForTimeout(200);
  await shot(page, '10-toast-copied');

  // 11. Share modal
  await page.waitForTimeout(3000); // let toast clear
  await page.click('button:has-text("Share")');
  await page.waitForSelector('#share-modal.visible', { timeout: 8000 });
  await page.waitForTimeout(300);
  await shot(page, '11-share-modal');
  await page.locator('.modal-close').click();
  await page.waitForTimeout(300);

  // 12. Writer template
  await page.goto(BASE);
  await page.waitForLoadState('networkidle');
  await page.locator('.template-card:has-text("Writer")').click();
  await page.waitForTimeout(300);
  await page.click('button:has-text("Generate My MIRROR SEED")');
  await page.waitForSelector('#output-container.visible');
  await page.locator('#output').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await shot(page, '12-writer-seed');

  // 13. Founder template
  await page.goto(BASE);
  await page.waitForLoadState('networkidle');
  await page.locator('.template-card:has-text("Founder")').click();
  await page.waitForTimeout(300);
  await page.click('button:has-text("Generate My MIRROR SEED")');
  await page.waitForSelector('#output-container.visible');
  await page.locator('#output').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await shot(page, '13-founder-seed');

  // 14. Three Laws section
  await page.goto(BASE);
  await page.waitForLoadState('networkidle');
  await page.locator('.laws').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await shot(page, '14-three-laws');

  // 15. Comparison section
  await page.locator('.comparison').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await shot(page, '15-comparison-why-sovereign');

  // 16. Stats bar close-up
  await page.goto(BASE);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000); // wait for stats API
  await page.locator('.stats-bar').scrollIntoViewIfNeeded();
  await shot(page, '16-stats-bar');

  // 17. Shared seed view (load a shared seed URL)
  // Create a seed first
  let shortcode = null;
  try {
    const res = await fetch('https://proxy.activemirror.ai/seed/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: '# MIRROR SEED v1.0 — id.activemirror.ai\n# Demo seed for screenshots\n\n---\n\n## Who I Am\n\nName: Riya Patel\nHandle: @riyabuilds\nLocation: Goa, India\nRole: Founder & CEO\nIndustry: AI / Developer Tools\n\n## My Style\n- Communication: I prefer direct and concise responses\n- Energy: I am enthusiastic\n- Values: sovereignty, speed, authenticity\n\n## Current Context\n- Currently: Launching v2 this month. Growing from 100 to 1000 users.\n- Tools: Linear, Vercel, GitHub, Notion, Twitter\n\n## How I Like Responses\n- Address me: Riya, directly\n- Length: Keep responses short (1-3 sentences)\n- Format: minimal formatting\n- Avoid: corporate speak, generic startup platitudes\n\n---\n\n## Instructions for AI\n\nYou are talking to Riya. Use this context to personalize every response.\n\n1. **Mirror, don\'t override**: Reflect my voice. Adapt to me, not vice versa.\n2. **Ground in truth**: Say "I don\'t know" when uncertain. No hallucination.\n3. **Preserve continuity**: Reference this context throughout our conversation.\n\n---\n⟡ MirrorDNA-Seed-v1 | Active MirrorOS\n△ Trust by Design — Identity belongs to the user' }),
    });
    const data = await res.json();
    shortcode = data.shortcode;
  } catch (e) {}

  if (shortcode) {
    await page.goto(`${BASE}/?seed=${shortcode}`);
    await page.waitForSelector('#output-container.visible', { timeout: 8000 });
    await page.waitForTimeout(500);
    await page.locator('#output').scrollIntoViewIfNeeded();
    await shot(page, '17-shared-seed-view');
  }

  await page.close();
  await context.close();

  // ═══ MOBILE SCREENSHOTS ═══
  console.log('\nMobile (390x844):');
  context = await browser.newContext({
    viewport: VIEWPORTS.mobile,
    permissions: ['clipboard-read', 'clipboard-write'],
    isMobile: true,
  });

  page = await context.newPage();
  await page.goto(BASE);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  // Mobile hero
  await shot(page, '18-mobile-hero');

  // Mobile full page
  await shot(page, '19-mobile-full-page', { full: true });

  // Mobile template selector
  await page.locator('#generator').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await shot(page, '20-mobile-templates');

  // Mobile generated output
  await page.locator('.template-card:has-text("Founder")').click();
  await page.waitForTimeout(300);
  await page.click('button:has-text("Generate My MIRROR SEED")');
  await page.waitForSelector('#output-container.visible');
  await page.waitForTimeout(500);
  await page.locator('#output').scrollIntoViewIfNeeded();
  await shot(page, '21-mobile-generated');

  // Mobile output actions
  await page.locator('.output-actions').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await shot(page, '22-mobile-actions');

  await page.close();
  await context.close();
  await browser.close();

  console.log(`\n⟡ Done. Screenshots saved to marketing/screenshots/`);
}

run().catch(console.error);
