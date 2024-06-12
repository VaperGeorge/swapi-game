import { test, expect, Page, BrowserContext } from '@playwright/test';

test.describe('Game page with PEOPLE selected', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/3');
    await page.getByTestId('game-card').first().waitFor({ state: 'visible' });
  });

  test('should have a correct title', async ({ page }) => {
    await expect(page.getByTestId('game-title')).toBeVisible();
    await expect(page.getByTestId('game-title')).toHaveText('Comparing People');
  });

  test('should have 2 cards visible', async ({ page }) => {
    await expect(page.getByTestId('left-card')).toBeVisible();
    await expect(page.getByTestId('right-card')).toBeVisible();
  });

  test('should have 2 buttons visible', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'GO TO START' })
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'PLAY AGAIN' })
    ).toBeVisible();
  });

  test('should regenerate cards when PLAY AGAIN button clicked', async ({
    page,
  }) => {
    const leftCard = await page
      .getByTestId('left-card')
      .locator('.mat-mdc-card-subtitle')
      .innerText();
    const rightCard = await page.getByTestId('right-card').innerText();

    await page.getByRole('button', { name: 'PLAY AGAIN' }).click();

    const leftCardChanged = await page
      .getByTestId('left-card')
      .locator('.mat-mdc-card-subtitle')
      .innerText();

    await expect(leftCard).not.toContainEqual(leftCardChanged),
      { timeout: 5000 };
  });
});

test.describe('Game page with START SHIPS selected', () => {
  test('should pass thought all steps', async ({ page }) => {
    await test.step('', async () => {
      await page.goto('http://localhost:4200/2');

      await expect(
        page.getByRole('button', { name: 'Starships' })
      ).toBeVisible();
      await page.getByRole('button', { name: 'Starships' }).click();
    });

    await test.step('should have a correct title', async () => {
      await expect(page.getByTestId('game-title')).toBeVisible();
      await expect(page.getByTestId('game-title')).toHaveText(
        'Comparing Star ships'
      );
    });

    await test.step('should have 2 cards visible', async () => {
      await expect(page.getByTestId('left-card')).toBeVisible();
      await expect(page.getByTestId('right-card')).toBeVisible();
    });

    await test.step('should have 2 buttons visible', async () => {
      await expect(
        page.getByRole('button', { name: 'GO TO START' })
      ).toBeVisible();
      await expect(
        page.getByRole('button', { name: 'PLAY AGAIN' })
      ).toBeVisible();
    });

    await test.step('should regenerate cards when PLAY AGAIN button clicked', async () => {
      const leftCard = await page
        .getByTestId('left-card')
        .locator('.mat-mdc-card-subtitle')
        .innerText();

      await page.getByRole('button', { name: 'PLAY AGAIN' }).click();

      const leftCardChanged = await page
        .getByTestId('left-card')
        .locator('.mat-mdc-card-subtitle')
        .innerText();

      await expect(leftCard).not.toContainEqual(leftCardChanged),
        { timeout: 5000 };
    });
  });
});
