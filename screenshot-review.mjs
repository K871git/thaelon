import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const OUT = 'd:/new_live/thaelon/screenshots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);

// Full page
await page.screenshot({ path: `${OUT}/00-full.png`, fullPage: true });

const sections = [
  { id: null,       name: '01-hero' },
  { id: 'about',    name: '02-about' },
  { id: 'skills',   name: '03-skills' },
  { id: 'process',  name: '04-process' },
  { id: 'products', name: '05-products' },
  { id: 'team',     name: '06-team' },
  { id: 'pricing',  name: '07-pricing' },
  { id: 'contact',  name: '08-contact' },
];

for (const s of sections) {
  if (s.id) {
    await page.evaluate(id => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
    }, s.id);
    await page.waitForTimeout(600);
  }
  await page.screenshot({ path: `${OUT}/${s.name}.png` });
}

// Footer
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/09-footer.png` });

// Product modal
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
await page.evaluate(() => document.getElementById('products')?.scrollIntoView({ behavior: 'instant' }));
await page.waitForTimeout(600);
const cards = await page.$$('.products__item');
if (cards[1]) {
  await cards[1].click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/10-product-modal.png` });
}

await browser.close();
console.log('Done — screenshots saved to', OUT);
