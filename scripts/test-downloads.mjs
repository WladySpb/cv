import puppeteer from "puppeteer";

const baseUrl = process.env.CV_BASE_URL || "http://127.0.0.1:4173";
const expectedDownloads = {
  overall: "Vladimir_Golubev_Overall.pdf",
  techlead: "Vladimir_Golubev_Tech_Lead.pdf",
  staff: "Vladimir_Golubev_Staff_Engineer.pdf",
  ai: "Vladimir_Golubev_AI_Engineer.pdf"
};

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
});

try {
  for (const [role, expectedFilename] of Object.entries(expectedDownloads)) {
    const page = await browser.newPage();
    await page.goto(`${baseUrl}/?role=${role}`, { waitUntil: "networkidle0" });
    await page.evaluate(() => {
      window.__downloadCapture = null;
      const originalClick = HTMLAnchorElement.prototype.click;
      HTMLAnchorElement.prototype.click = function () {
        if (this.hidden && this.download && this.href.startsWith("blob:")) {
          window.__downloadCapture = {
            filename: this.download,
            hrefProtocol: new URL(this.href).protocol
          };
          return;
        }
        return originalClick.call(this);
      };
      document.querySelector("#print-btn-2").dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true })
      );
    });
    await page.waitForFunction(() => window.__downloadCapture !== null);
    const captured = await page.evaluate(() => window.__downloadCapture);
    if (
      captured.filename !== expectedFilename ||
      captured.hrefProtocol !== "blob:"
    ) {
      throw new Error(
        `${role}: unexpected download ${JSON.stringify(captured)}`
      );
    }
    if (page.url() !== `${baseUrl}/?role=${role}` && !(role === "overall" && page.url() === `${baseUrl}/`)) {
      throw new Error(`${role}: download click navigated to ${page.url()}`);
    }
    console.log(`OK: ${role} downloads ${expectedFilename}`);
    await page.close();
  }
} finally {
  await browser.close();
}

