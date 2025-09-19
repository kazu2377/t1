import { test, expect, Page, Locator } from '@playwright/test';

const APP_URL = 'http://localhost:5173/';
const DISPLAY_SELECTOR = '.calc-display';
const ZERO_BUTTON_LABEL = '100';

const getDisplay = (page: Page) => page.locator(DISPLAY_SELECTOR);
const getCurrentValue = (display: Locator) => display.locator('span:not(.calc-error)').first();
const getGhostValue = (display: Locator) => display.locator('.calc-ghost');
const getErrorValue = (display: Locator) => display.locator('.calc-error');

async function pressDigit(page: Page, digit: string) {
  const label = digit === '0' ? ZERO_BUTTON_LABEL : digit;
  await page.getByRole('button', { name: label }).click();
}

async function pressOperator(page: Page, operator: string) {
  await page.getByRole('button', { name: operator }).click();
}

async function pressEqual(page: Page) {
  await page.getByRole('button', { name: '=' }).click();
}

async function pressClear(page: Page) {
  await page.getByRole('button', { name: 'C' }).click();
}

async function openCalculator(page: Page) {
  await page.goto(APP_URL);
  await expect(getDisplay(page)).toBeVisible();
}

test('電卓に200と入力すると200が表示される', async ({ page }) => {
  await openCalculator(page);

  const display = getDisplay(page);
  const current = getCurrentValue(display);

  await pressDigit(page, '2');
  await expect(current).toHaveText(/2/);

  await pressDigit(page, '0');
  await expect(current).toHaveText(/20/);

  await pressDigit(page, '0');
  await expect(current).toHaveText('200');
});

// 電卓ロジックの主要分岐を通して実行時カバレッジ 80% 以上を担保するテスト
// - 連続演算（chooseOperator の途中評価）
// - 四則演算（+, -, *, /）
// - エラー分岐（0 で割る）
// - クリア操作（clearAll）
test('四則演算とクリアで主要ロジックを網羅できる', async ({ page }) => {
  await openCalculator(page);

  const display = getDisplay(page);
  const current = getCurrentValue(display);
  const ghost = getGhostValue(display);
  const error = getErrorValue(display);

  // 5 + 2 * 3 = 21 （途中で * を押したタイミングで 5 + 2 を評価）
  await pressDigit(page, '5');
  await pressOperator(page, '+');
  await pressDigit(page, '2');
  await expect(ghost).toHaveText(/\s*5 \+/);

  await pressOperator(page, '*');
  await expect(ghost).toHaveText(/\s*7 \*/);
  await expect(current).toHaveText('0');

  await pressDigit(page, '3');
  await pressEqual(page);
  await expect(current).toHaveText('21');
  await expect(ghost).toHaveCount(0);

  // 21 - 9 = 12 を確認（継続して previous が null に戻っているか）
  await pressOperator(page, '-');
  await pressDigit(page, '9');
  await pressEqual(page);
  await expect(current).toHaveText('12');

  // 12 / 0 でエラー
  await pressOperator(page, '/');
  await pressDigit(page, '0');
  await pressEqual(page);
  await expect(error).toHaveText('Error');

  // クリアでリセットされるか
  await pressClear(page);
  await expect(current).toHaveText('0');
  await expect(error).toHaveCount(0);
});
