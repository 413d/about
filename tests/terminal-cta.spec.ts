import { test, expect } from '@playwright/test';

async function advanceToTerminal(page: import('@playwright/test').Page): Promise<void> {
	const next = page.locator('[data-qa="story-next"]');
	for (let index = 0; index < 8; index += 1) {
		await next.click();
	}
	await expect(page.locator('[data-story-counter]')).toHaveText(/9 \/ 9/);
}

test('terminal CTA offers a summary path and restart, without a placeholder mailto', async ({ page }) => {
	await page.goto('http://localhost:4321/');
	await expect(page.locator('[data-story-root]')).toHaveAttribute('data-enhanced', 'true');

	await advanceToTerminal(page);

	const summary = page.locator('[data-qa="story-cta-summary"]');
	await expect(summary).toBeVisible();
	await expect(summary).toHaveAttribute('href', '/text');
	await expect(page.locator('[data-qa="story-next"]')).toBeDisabled();
	await expect(page.locator('[data-qa="story-pause"]')).toHaveText('Start over');
	await expect(page.locator('[data-qa="story-cta-email"]')).toHaveCount(0);
	await expect(page.locator('a[href*="hello@example.com"]')).toHaveCount(0);

	await page.locator('[data-qa="story-pause"]').click();

	await expect(page.locator('[data-story-counter]')).toHaveText('Story 1 / 9');
	await expect(page.locator('[data-qa="story-pause"]')).toHaveText('Pause');
	await expect(page.locator('[data-qa="story-next"]')).toBeEnabled();
});

test('terminal CTA keeps Russian parity', async ({ page }) => {
	await page.goto('http://localhost:4321/ru/');
	await expect(page.locator('[data-story-root]')).toHaveAttribute('data-enhanced', 'true');

	await advanceToTerminal(page);

	await expect(page.locator('[data-qa="story-cta-summary"]')).toHaveAttribute('href', '/text/ru');
	await expect(page.locator('[data-qa="story-pause"]')).toHaveText('Начать заново');
	await expect(page.locator('[data-qa="story-next"]')).toBeDisabled();
});