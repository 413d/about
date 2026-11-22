import { test, expect } from '@playwright/test';

for (const path of ['/', '/ru', '/text', '/text/ru']) {
	test(`brand metadata on ${path}`, async ({ page }) => {
		await page.goto(`http://localhost:4321${path}`, { waitUntil: 'domcontentloaded' });
		const title = await page.title();
		expect(title.endsWith(' — 413d')).toBeTruthy();
		expect(title.match(/413d/g) ?? []).toHaveLength(1);
		await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', '413d');
	});
}

for (const path of ['/text', '/text/ru']) {
	test(`footer brand on ${path}`, async ({ page }) => {
		await page.goto(`http://localhost:4321${path}`, { waitUntil: 'domcontentloaded' });
		const footer = page.locator('footer');
		await expect(footer).toContainText(/© \d{4} 413d\./);
		await expect(footer).not.toContainText('Alex');
	});
}
