import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1800 });
    await page.goto('http://localhost:3000/checkout');
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
    await browser.close();
})();
