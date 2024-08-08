import chromium from '@sparticuz/chromium-min';
import puppeteer from 'puppeteer-core';

export const maxDuration = 20;

export async function POST(request: Request) {
  const { siteUrl } = await request.json();

  const isLocal = !!process.env.CHROME_EXECUTABLE_PATH;

  const browser = await puppeteer.launch({
    args: isLocal ? puppeteer.defaultArgs() : chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath('https://<Bucket Name>.s3.amazonaws.com/chromium-v126.0.0-pack.tar'),
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.goto(siteUrl);
  const pageTitle = await page.title();
  await browser.close();

  return Response.json({
    siteUrl,
    pageTitle,
  })
}