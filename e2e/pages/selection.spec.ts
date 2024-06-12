import { test, expect } from '@playwright/test';

test.describe('SELECTION page', () => {
  test('should correctly open and have buttons visible and with correct texts', async ({
    page,
  }) => {
    await page.goto('http://localhost:4200/2');

    await expect(page.getByRole('button', { name: 'People' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Starships' })).toBeVisible();

    await expect(page.locator('app-type-selection')).toContainText('People');
    await expect(page.locator('app-type-selection')).toContainText('Starships');

    await page.getByRole('button', { name: 'People' }).click();
  });
});
