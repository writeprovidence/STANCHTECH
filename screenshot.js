import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 375, height: 812 });
    await page.goto('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'screenshot_mobile.png', fullPage: true });
    await browser.close();
})();
