import fs from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

const baseUrl = process.env.CV_BASE_URL || "http://127.0.0.1:4173";
const outputDir = path.resolve("pdf");
const renders = [
  ["techlead", "Vladimir_Golubev_Tech_Lead.pdf"],
  ["staff", "Vladimir_Golubev_Staff_Engineer.pdf"],
  ["ai", "Vladimir_Golubev_AI_Architect.pdf"]
];

await fs.mkdir(outputDir, { recursive: true });

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
});

try {
  for (const [role, filename] of renders) {
    const page = await browser.newPage();
    await page.goto(`${baseUrl}/?role=${role}`, { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts?.ready);
    await page.emulateMediaType("print");
    await page.pdf({
      path: path.join(outputDir, filename),
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      tagged: false,
      margin: { top: "8mm", right: "10mm", bottom: "8mm", left: "10mm" }
    });
    await page.close();
  }
} finally {
  await browser.close();
}
