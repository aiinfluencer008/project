import puppeteer from 'puppeteer';
import path from 'path';
import { FRAMES_DIR } from '../config/paths.js';
import { ensureDirectoryExists } from '../utils/filesystem.js';

export async function captureFrames() {
  ensureDirectoryExists(FRAMES_DIR);
  
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920 }); // Vertical video for shorts
  await page.goto('http://localhost:5173' ,{ waitUntil: "domcontentloaded" });
  
  console.log('Capturing frames...');
  
  try {
    for (let i = 0; i < 30; i++) {
      const framePath = path.join(FRAMES_DIR, `frame-${i.toString().padStart(3, '0')}.png`);
      await page.screenshot({ path: framePath });
      await new Promise(r => setTimeout(r, 1000));
    }
  } finally {
    await browser.close();
  }
}