import { test, expect } from '@playwright/test';

test.describe('START page', () => {
  test('should correctly open page and have a button inside', async ({
    page,
  }) => {
    await page.goto('http://localhost:4200/');
    await page.goto('http://localhost:4200/1');
    await expect(page.getByRole('button', { name: 'START' })).toBeVisible();
    await expect(page.getByRole('button')).toContainText('START');
  });
});
