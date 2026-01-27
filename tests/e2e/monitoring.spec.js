// @ts-check
/**
 * MIRROR SEED — Synthetic Monitoring
 *
 * Critical path smoke test. Run via cron to detect outages.
 *
 *   npx playwright test tests/e2e/monitoring.spec.js
 *
 * Exit code 0 = healthy, non-zero = broken.
 */
const { test, expect } = require('@playwright/test');

const PROXY = 'https://proxy.activemirror.ai';

test.describe('Synthetic Monitor', () => {
  test('full critical path: load → generate → share → load shared', async ({ page, context, request }) => {
    // 1. Page loads
    await page.goto('/');
    await expect(page).toHaveTitle(/MIRROR SEED/);
    await expect(page.locator('.hero h1')).toBeVisible();

    // 2. Stats bar populates from API
    await expect(page.locator('#stat-generated')).not.toHaveText('0', { timeout: 8000 });

    // 3. Apply template
    await page.locator('.template-card:has-text("Founder")').click();
    const nameVal = await page.locator('#userName').inputValue();
    expect(nameVal.length).toBeGreaterThan(0);

    // 4. Generate seed
    await page.click('button:has-text("Generate My MIRROR SEED")');
    await expect(page.locator('#output-container')).toBeVisible();
    const output = await page.locator('#output').textContent();
    expect(output).toContain('MIRROR SEED v1.0');

    // 5. Share via API
    const createRes = await request.post(`${PROXY}/seed/create`, {
      data: { content: output },
    });
    expect(createRes.ok()).toBeTruthy();
    const { shortcode } = await createRes.json();
    expect(shortcode).toMatch(/^[a-f0-9]{6}$/);

    // 6. Load shared seed
    await page.goto(`/?seed=${shortcode}`);
    await expect(page.locator('#output-container')).toBeVisible({ timeout: 8000 });
    const sharedOutput = await page.locator('#output').textContent();
    expect(sharedOutput).toContain('MIRROR SEED');

    // 7. Backend health
    const healthRes = await request.get(`${PROXY}/health`);
    expect(healthRes.ok()).toBeTruthy();
  });

  test('API endpoints are responsive', async ({ request }) => {
    const endpoints = ['/health', '/stats', '/seed-count'];
    for (const ep of endpoints) {
      const res = await request.get(`${PROXY}${ep}`);
      expect(res.ok(), `${ep} should return 200`).toBeTruthy();
      const data = await res.json();
      expect(data.status).toBe('ok');
    }
  });
});
