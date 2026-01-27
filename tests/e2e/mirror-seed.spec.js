// @ts-check
const { test, expect } = require('@playwright/test');

const BASE = 'https://id.activemirror.ai';
const PROXY = 'https://proxy.activemirror.ai';

// ═══════════════════════════════════════════════════════════════
// PAGE LOAD
// ═══════════════════════════════════════════════════════════════

test.describe('Page Load', () => {
  test('renders title and hero', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/MIRROR SEED/);
    await expect(page.locator('.hero h1')).toContainText('Never Explain Yourself to AI Again');
    await expect(page.locator('.hero-badge')).toContainText('User-Sovereign Protocol');
  });

  test('stats bar loads with numbers from API', async ({ page }) => {
    await page.goto('/');
    const generated = page.locator('#stat-generated');
    const shared = page.locator('#stat-shared');
    // Wait for API fetch to populate (should be >0 if API is up)
    await expect(generated).not.toHaveText('0', { timeout: 8000 });
    await expect(shared).toBeVisible();
  });

  test('ecosystem banner renders', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.ecosystem-banner')).toContainText('Active MirrorOS');
  });

  test('three-step process renders', async ({ page }) => {
    await page.goto('/');
    const steps = page.locator('.step');
    await expect(steps).toHaveCount(3);
    await expect(steps.nth(0)).toContainText('Create Seed');
    await expect(steps.nth(1)).toContainText('Save Your File');
    await expect(steps.nth(2)).toContainText('Paste Into Any AI');
  });
});

// ═══════════════════════════════════════════════════════════════
// TEMPLATES
// ═══════════════════════════════════════════════════════════════

test.describe('Templates', () => {
  test('all 6 template cards render', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('.template-card');
    await expect(cards).toHaveCount(6);
    await expect(cards.nth(0)).toContainText('Developer');
    await expect(cards.nth(1)).toContainText('Writer');
    await expect(cards.nth(2)).toContainText('Executive');
    await expect(cards.nth(3)).toContainText('Student');
    await expect(cards.nth(4)).toContainText('Parent');
    await expect(cards.nth(5)).toContainText('Founder');
  });

  const templates = ['developer', 'writer', 'executive', 'student', 'parent', 'founder'];
  for (const tmpl of templates) {
    test(`${tmpl} template fills form and updates progress`, async ({ page }) => {
      await page.goto('/');
      // Click template
      await page.locator(`.template-card:has-text("${tmpl[0].toUpperCase() + tmpl.slice(1)}")`).click();
      // Name field should be populated
      const nameVal = await page.locator('#userName').inputValue();
      expect(nameVal.length).toBeGreaterThan(0);
      // Progress should be > 0%
      const progressText = await page.locator('#progress-text').textContent();
      const pct = parseInt(progressText);
      expect(pct).toBeGreaterThan(50);
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// FORM TABS
// ═══════════════════════════════════════════════════════════════

test.describe('Form Tabs', () => {
  test('switching tabs shows correct content', async ({ page }) => {
    await page.goto('/');
    // Basics tab is active by default
    await expect(page.locator('#tab-basics')).toBeVisible();
    await expect(page.locator('#tab-personality')).toBeHidden();

    // Click Personality tab
    await page.locator('.tab:has-text("Personality")').click();
    await expect(page.locator('#tab-personality')).toBeVisible();
    await expect(page.locator('#tab-basics')).toBeHidden();

    // Click Work tab
    await page.locator('.tab:has-text("Work")').click();
    await expect(page.locator('#tab-work')).toBeVisible();

    // Click Preferences tab
    await page.locator('.tab:has-text("Preferences")').click();
    await expect(page.locator('#tab-prefs')).toBeVisible();
  });
});

// ═══════════════════════════════════════════════════════════════
// GENERATE SEED
// ═══════════════════════════════════════════════════════════════

test.describe('Generate Seed', () => {
  test('generate produces visible output with correct header', async ({ page }) => {
    await page.goto('/');
    // Fill minimum fields
    await page.fill('#userName', 'Test User');
    await page.fill('#userBio', 'E2E test identity');

    // Generate
    await page.click('button:has-text("Generate My MIRROR SEED")');

    // Output container should be visible
    const container = page.locator('#output-container');
    await expect(container).toBeVisible();

    // Output should contain the seed header
    const output = await page.locator('#output').textContent();
    expect(output).toContain('MIRROR SEED v1.0');
    expect(output).toContain('id.activemirror.ai');
    expect(output).toContain('Test User');
    expect(output).toContain('E2E test identity');
    expect(output).toContain('MirrorDNA');
  });

  test('generate shows toast notification', async ({ page }) => {
    await page.goto('/');
    await page.fill('#userName', 'Toast Test');
    await page.click('button:has-text("Generate My MIRROR SEED")');

    // Toast should appear
    const toast = page.locator('.toast');
    await expect(toast).toContainText('Seed generated!');
    await expect(toast).toHaveClass(/visible/);
  });

  test('generate includes all filled fields in output', async ({ page }) => {
    await page.goto('/');
    // Apply a template to fill all fields
    await page.locator('.template-card:has-text("Developer")').click();
    await page.click('button:has-text("Generate My MIRROR SEED")');

    const output = await page.locator('#output').textContent();
    expect(output).toContain('Alex Chen');
    expect(output).toContain('San Francisco');
    expect(output).toContain('Senior Software Engineer');
    expect(output).toContain('Fintech');
    expect(output).toContain('direct and concise');
    expect(output).toContain('Mirror, don\'t override');
    expect(output).toContain('Trust by Design');
  });

  test('generate with no name defaults to User', async ({ page }) => {
    await page.goto('/');
    await page.click('button:has-text("Generate My MIRROR SEED")');
    const output = await page.locator('#output').textContent();
    expect(output).toContain('Name: User');
  });
});

// ═══════════════════════════════════════════════════════════════
// PLATFORM FORMAT SELECTOR
// ═══════════════════════════════════════════════════════════════

test.describe('Platform Format Selector', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('#userName', 'Format Test');
    await page.click('button:has-text("Generate My MIRROR SEED")');
    await expect(page.locator('#output-container')).toBeVisible();
  });

  test('universal format is default', async ({ page }) => {
    const activeBtn = page.locator('.format-opt.active');
    await expect(activeBtn).toContainText('Universal');
    const output = await page.locator('#output').textContent();
    expect(output).toContain('MIRROR SEED v1.0');
    expect(output).not.toContain('Custom Instructions');
    expect(output).not.toContain('<identity>');
  });

  test('chatgpt format wraps output', async ({ page }) => {
    await page.locator('.format-opt:has-text("ChatGPT")').click();
    const output = await page.locator('#output').textContent();
    expect(output).toContain('Custom Instructions');
    expect(output).toContain('Apply these preferences');
  });

  test('claude format wraps with identity tags', async ({ page }) => {
    await page.locator('.format-opt:has-text("Claude")').click();
    const output = await page.locator('#output').textContent();
    expect(output).toContain('<identity>');
    expect(output).toContain('</identity>');
  });

  test('gemini format wraps output', async ({ page }) => {
    await page.locator('.format-opt:has-text("Gemini")').click();
    const output = await page.locator('#output').textContent();
    expect(output).toContain('# About Me');
    expect(output).toContain('personalize your responses');
  });

  test('switching back to universal removes wrapper', async ({ page }) => {
    await page.locator('.format-opt:has-text("Claude")').click();
    let output = await page.locator('#output').textContent();
    expect(output).toContain('<identity>');

    await page.locator('.format-opt:has-text("Universal")').click();
    output = await page.locator('#output').textContent();
    expect(output).not.toContain('<identity>');
    expect(output).toContain('MIRROR SEED v1.0');
  });
});

// ═══════════════════════════════════════════════════════════════
// PLATFORM LAUNCH BUTTONS
// ═══════════════════════════════════════════════════════════════

test.describe('Platform Launch Buttons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('#userName', 'Platform Test');
    await page.click('button:has-text("Generate My MIRROR SEED")');
    await expect(page.locator('#output-container')).toBeVisible();
  });

  test('ChatGPT button shows toast and opens new tab', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    const pagePromise = context.waitForEvent('page', { timeout: 5000 });
    await page.click('.btn-platform.chatgpt');

    // Toast fires immediately
    await expect(page.locator('.toast.visible').last()).toContainText('ChatGPT');

    // Tab opens after 600ms delay
    const newPage = await pagePromise;
    expect(newPage.url()).toMatch(/chat\.openai\.com|chatgpt\.com/);
  });

  test('Claude button opens new tab', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    const pagePromise = context.waitForEvent('page', { timeout: 5000 });
    await page.click('.btn-platform.claude');
    const newPage = await pagePromise;
    expect(newPage.url()).toContain('claude.ai');
  });

  test('Gemini button opens new tab', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    const pagePromise = context.waitForEvent('page', { timeout: 5000 });
    await page.click('.btn-platform.gemini');
    const newPage = await pagePromise;
    expect(newPage.url()).toContain('gemini.google.com');
  });
});

// ═══════════════════════════════════════════════════════════════
// COPY TO CLIPBOARD
// ═══════════════════════════════════════════════════════════════

test.describe('Copy', () => {
  test('copy button shows copied toast', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');
    await page.fill('#userName', 'Copy Test');
    await page.click('button:has-text("Generate My MIRROR SEED")');
    await expect(page.locator('#output-container')).toBeVisible();

    // Wait for generate toast to auto-dismiss
    await page.waitForTimeout(3000);

    await page.click('button:has-text("Copy")');

    // Toast should show "Copied"
    await expect(page.locator('.toast.visible').last()).toContainText('Copied to clipboard');
  });
});

// ═══════════════════════════════════════════════════════════════
// DOWNLOAD
// ═══════════════════════════════════════════════════════════════

test.describe('Download', () => {
  test('download creates .mirrorseed file', async ({ page }) => {
    await page.goto('/');
    await page.fill('#userName', 'Download Test');
    await page.click('button:has-text("Generate My MIRROR SEED")');
    await expect(page.locator('#output-container')).toBeVisible();

    // Listen for download
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('button:has-text("Download")'),
    ]);

    const filename = download.suggestedFilename();
    expect(filename).toBe('download-test.mirrorseed');

    // Verify content
    const path = await download.path();
    const fs = require('fs');
    const content = fs.readFileSync(path, 'utf-8');
    expect(content).toContain('MIRROR SEED v1.0');
    expect(content).toContain('Download Test');
  });

  test('download toast shows filename', async ({ page }) => {
    await page.goto('/');
    await page.fill('#userName', 'Toast DL');
    await page.click('button:has-text("Generate My MIRROR SEED")');

    // Wait for generate toast to clear
    await page.waitForTimeout(3000);

    const downloadPromise = page.waitForEvent('download');
    await page.click('button:has-text("Download")');
    await downloadPromise;

    await expect(page.locator('.toast.visible').last()).toContainText('.mirrorseed');
  });
});

// ═══════════════════════════════════════════════════════════════
// SHARE FLOW
// ═══════════════════════════════════════════════════════════════

test.describe('Share', () => {
  test('share button opens modal with URL', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');
    await page.fill('#userName', 'Share Test');
    await page.fill('#userBio', 'Testing share flow');
    await page.click('button:has-text("Generate My MIRROR SEED")');
    await expect(page.locator('#output-container')).toBeVisible();

    // Click share
    await page.click('button:has-text("Share")');

    // Modal should be visible
    const modal = page.locator('#share-modal');
    await expect(modal).toHaveClass(/visible/, { timeout: 8000 });

    // URL should be populated
    const urlInput = page.locator('#share-url');
    const url = await urlInput.inputValue();
    expect(url).toContain('id.activemirror.ai/?seed=');
    expect(url.length).toBeGreaterThan(30);
  });

  test('share modal close button works', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');
    await page.fill('#userName', 'Close Test');
    await page.click('button:has-text("Generate My MIRROR SEED")');
    await page.click('button:has-text("Share")');

    await expect(page.locator('#share-modal')).toHaveClass(/visible/, { timeout: 8000 });

    // Close
    await page.locator('.modal-close').click();
    await expect(page.locator('#share-modal')).not.toHaveClass(/visible/);
  });

  test('share modal copy link button works', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');
    await page.fill('#userName', 'Link Copy');
    await page.click('button:has-text("Generate My MIRROR SEED")');

    // Wait for generate toast to clear
    await page.waitForTimeout(3000);

    await page.click('button:has-text("Share")');
    await expect(page.locator('#share-modal')).toHaveClass(/visible/, { timeout: 8000 });

    // Copy link
    await page.locator('.share-url-box button').click();
    await expect(page.locator('.toast.visible').last()).toContainText('Link copied');
  });
});

// ═══════════════════════════════════════════════════════════════
// SHARED SEED LOADING (via ?seed= query param)
// ═══════════════════════════════════════════════════════════════

test.describe('Shared Seed Loading', () => {
  let shortcode;

  test.beforeAll(async ({ request }) => {
    // Create a shared seed via API
    const res = await request.post(`${PROXY}/seed/create`, {
      data: { content: '# E2E Test Seed\nName: Playwright Bot\nThis is an automated test seed.' },
    });
    const data = await res.json();
    shortcode = data.shortcode;
  });

  test('loading ?seed=CODE shows shared content', async ({ page }) => {
    await page.goto(`/?seed=${shortcode}`);

    // Output container should be visible
    await expect(page.locator('#output-container')).toBeVisible({ timeout: 8000 });

    // Should show the shared content
    const output = await page.locator('#output').textContent();
    expect(output).toContain('Playwright Bot');
    expect(output).toContain('E2E Test Seed');
  });

  test('shared seed shows view count toast', async ({ page }) => {
    await page.goto(`/?seed=${shortcode}`);
    const toast = page.locator('.toast');
    await expect(toast).toContainText('views', { timeout: 8000 });
  });

  test('invalid seed code does not crash page', async ({ page }) => {
    await page.goto('/?seed=000000');
    // Page should still load normally
    await expect(page.locator('.hero h1')).toContainText('Never Explain');
    // Output should not be visible (seed doesn't exist)
    await expect(page.locator('#output-container')).not.toHaveClass(/visible/);
  });
});

// ═══════════════════════════════════════════════════════════════
// API HEALTH (Backend integration)
// ═══════════════════════════════════════════════════════════════

test.describe('API Integration', () => {
  test('stats endpoint returns valid data', async ({ request }) => {
    const res = await request.get(`${PROXY}/stats`);
    expect(res.ok()).toBeTruthy();
    const data = await res.json();
    expect(data.status).toBe('ok');
    expect(typeof data.generated).toBe('number');
    expect(typeof data.shared).toBe('number');
    expect(data.generated).toBeGreaterThan(0);
  });

  test('seed-count endpoint returns valid data', async ({ request }) => {
    const res = await request.get(`${PROXY}/seed-count`);
    expect(res.ok()).toBeTruthy();
    const data = await res.json();
    expect(data.status).toBe('ok');
    expect(data.count).toBeGreaterThan(0);
  });

  test('seed create + retrieve roundtrip', async ({ request }) => {
    const content = `# Roundtrip Test ${Date.now()}`;
    // Create
    const createRes = await request.post(`${PROXY}/seed/create`, {
      data: { content },
    });
    expect(createRes.ok()).toBeTruthy();
    const createData = await createRes.json();
    expect(createData.shortcode).toMatch(/^[a-f0-9]{6}$/);

    // Retrieve
    const getRes = await request.get(`${PROXY}/seed/${createData.shortcode}`);
    expect(getRes.ok()).toBeTruthy();
    const getData = await getRes.json();
    expect(getData.content).toBe(content);
    expect(getData.views).toBeGreaterThan(0);
  });

  test('proxy health check passes', async ({ request }) => {
    const res = await request.get(`${PROXY}/health`);
    expect(res.ok()).toBeTruthy();
    const data = await res.json();
    expect(data.status).toBe('ok');
  });
});

// ═══════════════════════════════════════════════════════════════
// CONTENT SECTIONS
// ═══════════════════════════════════════════════════════════════

test.describe('Content Sections', () => {
  test('Three Laws section renders', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.law')).toHaveCount(3);
    await expect(page.locator('.laws')).toContainText('Mirror, don\'t override');
    await expect(page.locator('.laws')).toContainText('Ground in truth');
    await expect(page.locator('.laws')).toContainText('Preserve continuity');
  });

  test('comparison section renders', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.comparison-col.bad')).toContainText('Platform Memory');
    await expect(page.locator('.comparison-col.good')).toContainText('MIRROR SEED');
  });

  test('FAQ section renders', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=How is this different from ChatGPT memory?')).toBeVisible();
    await expect(page.locator('text=Which AIs work with this?')).toBeVisible();
  });

  test('footer renders with creator and links', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toContainText('Paul Desai');
    await expect(page.locator('footer a[href*="github"]')).toBeVisible();
  });
});
