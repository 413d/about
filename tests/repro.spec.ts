
import { test, expect } from '@playwright/test';

test('story UI breaks on language switch', async ({ page }) => {
  await page.goto('http://localhost:4321/');
  
  // Verify it works on initial load
  const root = page.locator('[data-story-root]');
  await expect(root).toHaveAttribute('data-enhanced', 'true');
  
  // Switch to Russian
  await page.click('a[hreflang="ru"]');
  await page.waitForLoadState('networkidle');
  
  // Check if it is broken
  const rootRu = page.locator('[data-story-root]');
  
  // Check attributes
  const enhanced = await rootRu.getAttribute('data-enhanced');
  const ready = await rootRu.getAttribute('data-ready');
  
  console.log(`Enhanced: ${enhanced}, Ready: ${ready}`);
  
  // Assertions based on symptoms
  await expect(rootRu).toHaveAttribute('data-enhanced', 'true');
  await expect(rootRu).toHaveAttribute('data-ready', 'true');
});
