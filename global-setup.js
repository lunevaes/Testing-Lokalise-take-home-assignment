const { chromium, firefox, webkit } = require("@playwright/test");

module.exports = async (config) => {
  const browser = await chromium.launch();

  const page = await browser.newPage();

  // Authorizing with test user
  // This step will provide completion of the precondition in every case: Logged user on /projects page

  await page.goto("https://app.stage.lokalise.cloud/", { timeout: 120000 });

  await page.waitForTimeout(8000);

  await page.fill('input[placeholder="user@company.com"]', "login");

  await page.fill('input[placeholder="password"]', "password");

  await page.locator(".fltWyq").click();

  // Save signed-in state to 'storageState.json'.

  await page.context().storageState({ path: "storageState.json" });

  await browser.close();
};
