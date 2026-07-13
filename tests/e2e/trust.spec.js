// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

test('trust registry exposes issuer boundaries and verifier controls', async ({ page, request }) => {
  await page.goto('/trust/');
  await expect(page).toHaveTitle(/MirrorProof Verifier/);
  await expect(page.getByRole('heading', { name: 'Verify the receipt, not the story.' })).toBeVisible();
  await expect(page.getByText(/does not prove that the submitted message/i)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Verify receipt' })).toBeVisible();

  const issuer = await request.get('/issuers/chetana/v1.json');
  expect(issuer.ok()).toBeTruthy();
  const issuerBody = await issuer.json();
  expect(issuerBody.algorithm).toBe('Ed25519');
  expect(issuerBody.assurance_boundary).toContain('does not prove');

  const status = await request.get('/status/chetana-v1.json');
  expect(status.ok()).toBeTruthy();
  expect((await status.json()).status).toBe('active');
});

test('verifier rejects malformed input without inventing a result', async ({ page }) => {
  await page.goto('/trust/');
  await page.getByLabel('MirrorProof receipt JSON').fill('{bad json');
  await page.getByRole('button', { name: 'Verify receipt' }).click();
  await expect(page.getByText('Unable to verify')).toBeVisible();
});

test('verifier validates the signed Chetana fixture against the registered key', async ({ page }) => {
  const receipt = fs.readFileSync(
    path.join(__dirname, '..', 'fixtures', 'chetana-assessment-v0.1.json'),
    'utf8',
  );
  await page.goto('/trust/');
  await page.getByLabel('MirrorProof receipt JSON').fill(receipt);
  await page.getByRole('button', { name: 'Verify receipt' }).click();

  await expect(page.getByText('Valid signed receipt')).toBeVisible();
  await expect(page.getByText('The receipt is intact and was signed by the currently registered Chetana key.')).toBeVisible();
  await expect(page.getByText('sender identity and authority')).toBeVisible();
  await expect(page.getByText('not_checked')).toBeVisible();
});
