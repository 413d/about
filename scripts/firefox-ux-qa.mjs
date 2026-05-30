import { firefox } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:4173';
const artifactsDir = process.env.QA_ARTIFACTS_DIR ?? '';
const report = {
  baseUrl,
  checks: [],
  timestamp: new Date().toISOString()
};

async function ensureArtifactsDir() {
  if (!artifactsDir) return;
  await mkdir(artifactsDir, { recursive: true });
}

async function saveScreenshot(page, name) {
  if (!artifactsDir) return;
  await page.screenshot({ path: path.join(artifactsDir, `${name}.png`), fullPage: true });
}

function pushCheck(name, status, details = {}) {
  report.checks.push({ name, status, ...details });
}

async function saveReport() {
  if (!artifactsDir) return;
  await writeFile(path.join(artifactsDir, 'report.json'), JSON.stringify(report, null, 2), 'utf8');
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function runDesktopChecks() {
  const browser = await firefox.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('[data-qa="story-root"]');
  await saveScreenshot(page, 'desktop-en-initial');

  const counter = page.locator('[data-qa="story-counter"]');
  await counter.waitFor();
  assert((await counter.textContent())?.includes('Story 1 / 9'), 'Initial EN counter mismatch');

  await page.locator('[data-qa="story-next"]').click();
  await page.waitForTimeout(100);
  assert((await counter.textContent())?.includes('Story 2 / 9'), 'Next navigation failed on desktop');

  await page.locator('[data-qa="story-root"]').focus();
  await page.keyboard.press('Space');
  await page.waitForTimeout(50);
  const pauseButton = page.locator('[data-qa="story-pause"]');
  assert((await pauseButton.textContent())?.toLowerCase().includes('resume'), 'Pause toggle did not switch to Resume');

  await page.keyboard.press('Space');
  await page.waitForTimeout(50);
  assert((await pauseButton.textContent())?.toLowerCase().includes('pause'), 'Resume toggle did not switch back to Pause');

  for (let i = 0; i < 7; i += 1) {
    await page.locator('[data-qa="story-next"]').click();
    await page.waitForTimeout(40);
  }
  assert((await counter.textContent())?.includes('Story 9 / 9'), 'Failed to reach terminal CTA story');
  await saveScreenshot(page, 'desktop-en-cta');

  const ctaHref = await page.locator('[data-story-cta]').first().getAttribute('href');
  assert(Boolean(ctaHref?.startsWith('mailto:')), 'CTA href is not mailto');

  await page.locator('[data-qa="lang-ru"]').click();
  await page.waitForURL(`${baseUrl}/ru`);
  const ruCounter = await page.locator('[data-qa="story-counter"]').textContent();
  assert(ruCounter?.includes('Экран 1 / 9'), 'RU counter mismatch');
  await saveScreenshot(page, 'desktop-ru-initial');

  await page.locator('[data-qa="open-text-mode"]').click();
  await page.waitForURL(`${baseUrl}/text/ru`);
  const ruHeading = await page.locator('h1').first().textContent();
  assert(Boolean(ruHeading && ruHeading.trim().length > 0), 'RU text page heading missing');
  await saveScreenshot(page, 'desktop-ru-text');

  await page.locator('[data-qa="back-to-stories"]').click();
  await page.waitForURL(`${baseUrl}/ru`);

  await page.goto(`${baseUrl}/text`, { waitUntil: 'domcontentloaded' });
  const enTextHeading = await page.locator('h1').first().textContent();
  assert(Boolean(enTextHeading && enTextHeading.trim().length > 0), 'EN text page heading missing');
  await saveScreenshot(page, 'desktop-en-text');

  pushCheck('desktop', 'passed');

  await browser.close();
}

async function runMobileChecks() {
  const browser = await firefox.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
  const page = await context.newPage();

  await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('[data-qa="story-root"]');

  const counter = page.locator('[data-qa="story-counter"]');
  assert((await counter.textContent())?.includes('Story 1 / 9'), 'Initial mobile counter mismatch');
  await saveScreenshot(page, 'mobile-initial');

  await page.locator('[data-story-hitzone="next"]').click();
  await page.waitForTimeout(80);
  assert((await counter.textContent())?.includes('Story 2 / 9'), 'Mobile next zone click failed');

  await page.locator('[data-story-hitzone="pause"]').click();
  await page.waitForTimeout(50);
  const pauseLabel = (await page.locator('[data-qa="story-pause"]').textContent())?.toLowerCase() ?? '';
  assert(pauseLabel.includes('resume'), 'Mobile pause did not update button label');
  await saveScreenshot(page, 'mobile-paused');

  pushCheck('mobile', 'passed');

  await browser.close();
}

async function runReducedMotionChecks() {
  const browser = await firefox.launch({ headless: true });
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();

  await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('[data-qa="story-root"]');

  const pauseLabel = (await page.locator('[data-qa="story-pause"]').textContent())?.toLowerCase() ?? '';
  assert(pauseLabel.includes('resume'), 'Reduced-motion mode should start paused');
  await saveScreenshot(page, 'reduced-motion-paused');

  pushCheck('reduced-motion', 'passed');

  await browser.close();
}

async function runNoJsChecks() {
  const browser = await firefox.launch({ headless: true });
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
  const noJsText = await page.locator('noscript p').textContent();
  assert(Boolean(noJsText && noJsText.length > 0), 'No-JS hint not visible');

  const storiesCount = await page.locator('[data-story-item]').count();
  assert(storiesCount === 9, 'No-JS story list should render all 9 stories');
  await saveScreenshot(page, 'no-js-fallback');

  pushCheck('no-js', 'passed', { storiesCount });

  await browser.close();
}

async function main() {
  await ensureArtifactsDir();
  await runDesktopChecks();
  await runMobileChecks();
  await runReducedMotionChecks();
  await runNoJsChecks();
  await saveReport();
  console.log('FIREFOX_QA_OK');
}

main().catch((error) => {
  pushCheck('fatal', 'failed', { message: String(error) });
  saveReport().catch(() => {});
  console.error('FIREFOX_QA_FAILED');
  console.error(error);
  process.exit(1);
});
