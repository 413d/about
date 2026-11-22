import { test, expect } from '@playwright/test';

const cases = [
	{ path: '/', href: '/', name: '413d — Go to home' },
	{ path: '/ru', href: '/ru', name: '413d — На главную' },
	{ path: '/text', href: '/', name: '413d — Go to home' },
	{ path: '/text/ru', href: '/ru', name: '413d — На главную' }
];

for (const item of cases) {
	test(`brand lockup on ${item.path}`, async ({ page }) => {
		await page.goto(`http://localhost:4321${item.path}`, { waitUntil: 'domcontentloaded' });
		const brand = page.locator('[data-qa="brand-home"]');
		await expect(brand).toBeVisible();
		await expect(brand).toHaveAttribute('href', item.href);
		await expect(brand).toHaveAccessibleName(item.name);
		await expect(brand).toContainText('413d');
		const avatar = brand.locator('img');
		await expect(avatar).toHaveAttribute('src', 'https://avatars.githubusercontent.com/u/20566780?v=4&s=160');
		await expect(avatar).toHaveAttribute('alt', '');
	});
}

test('GitHub avatar URL is reachable', async ({ request }) => {
	const response = await request.get('https://avatars.githubusercontent.com/u/20566780?v=4&s=160');
	expect(response.ok()).toBeTruthy();
});

test('brand link survives a blocked avatar request', async ({ page }) => {
	await page.route('https://avatars.githubusercontent.com/**', (route) => route.abort());
	await page.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded' });
	const brand = page.locator('[data-qa="brand-home"]');
	await expect(brand).toBeVisible();
	await expect(brand).toHaveAccessibleName('413d — Go to home');
	await expect(brand.locator('img')).toHaveCSS('width', '32px');
});

test('brand lockup fits a 320px viewport', async ({ page }) => {
	await page.setViewportSize({ width: 320, height: 720 });
	await page.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded' });
	await expect(page.locator('[data-qa="brand-home"]')).toBeVisible();
	const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
	expect(overflow).toBeLessThanOrEqual(0);
});
