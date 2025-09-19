import { test, expect } from '@playwright/test';

test('電卓に200と入力すると200が表示される', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  const display = page.locator('.calc-display span:not(.calc-error)').first();

  await page.getByRole('button', { name: '2' }).click();
  await expect(display).toHaveText(/2/);

  await page.getByRole('button', { name: '100' }).click();
  await expect(display).toHaveText(/20/);

  await page.getByRole('button', { name: '100' }).click();
  await expect(display).toHaveText('200');
});
