const { test, expect } = require("@playwright/test");

test.describe.serial("suite", () => {
  test("Pre-step", async ({ page }) => {
    //  Deleting possible already existing projects
    await page.goto("https://app.stage.lokalise.cloud/");

    await page.waitForTimeout(4000);

    if (await page.$("text='Get started'")) {
      console.log(
        "There are no projects. It is possible to add the first one."
      );
    } else {
      const number = await page
        .locator("project-list > div > div > div:nth-child(2) > div")
        .count();

      if (number > 0) {
        var y = number;
        do {
          await page
            .locator(
              "project-list > div > div > div:nth-child(2) > div:nth-child(1) > div > div > div > a"
            )
            .click();

          await page
            .locator(
              "project-header > div > div > div > div > nav > ul > li:nth-child(9) > div:nth-child(1) > button"
            )
            .click();

          await page.locator("#menu-list-2-menuitem-3").click();

          await page
            .locator("a.btn.btn-danger.btn-outlined.project-delete")
            .click();

          const name = await page
            .locator("h4 > div > strong:nth-child(2)")
            .innerHTML();

          await page
            .locator(
              "body > div.bootbox.modal.bootbox-prompt.in > div > div > div.modal-body > div > form > input"
            )
            .fill(name);

          await page.locator("button.btn.btn-danger.btn-outlined").click();

          y = y - 1;
        } while (y !== 0);
        console.log("Previous projects are deleted.");
      }
    }
  });

  test("case 1", async ({ page }) => {
    //Steps:
    //- Add project with just required fields
    //Expected result:
    //- Project should be created
    //- Project’s page should be opened
    //- On /projects there should be just this project

    //Adding the first project by the button "Get started"
    await page.goto("https://app.stage.lokalise.cloud/");

    await page.waitForTimeout(4000);

    await page.locator("text=Get started").click();

    await page.fill(
      'input[placeholder="MyApp (iOS + Android + Web)"]',
      "First Project"
    );

    await page
      .locator(
        "label:nth-child(3) div .sc-csTbgd .sc-eGJWMs .Select__control .Select__indicators"
      )
      .click();

    await page.locator("#react-select-3-option-2").click();

    await page.locator('#tabs--1--panel--0 button:has-text("Proceed")').click();

    //Checking that project's page is opened

    await page.waitForURL("**/project/**");

    expect(await page.title()).toContain("First Project");

    console.log(
      "The first project is created. Project's page is opened. The URL is " +
        page.url()
    );

    await page.click("text=Projects");

    //Checking that there is only one project

    await page.waitForSelector(
      "project-list > div > div > div:nth-child(2) > div"
    );

    await expect(
      page.locator("project-list > div > div > div:nth-child(2) > div")
    ).toHaveCount(1);

    console.log("On /projects, there is only one project.");
  });

  test("case 2", async ({ page }) => {
    //Steps:
    // - Add project with just required fields
    //Expected result:
    // - Project should be created
    // - Project’s page should be opened
    // - On /projects there should be two projects in correct order

    //Adding the nth project by the button "New project"
    await page.goto("https://app.stage.lokalise.cloud/");

    await page.waitForTimeout(4000);

    await page.locator("button:has-text('New project')").click();

    await page.fill(
      'input[placeholder="MyApp (iOS + Android + Web)"]',
      "Nth Project"
    );

    await page
      .locator(
        "label:nth-child(3) div .sc-csTbgd .sc-eGJWMs .Select__control .Select__indicators"
      )
      .click();

    await page.locator("#react-select-3-option-2").click();

    await page.locator('#tabs--1--panel--0 button:has-text("Proceed")').click();

    //Checking that project's page is opened

    await page.waitForURL("**/project/**");

    expect(await page.title()).toContain("Nth Project");

    console.log(
      "The nth project was created. Project's page is opened. The URL is " +
        page.url()
    );

    await page.click("text=Projects");

    //Checking that there are two projects in correct order

    await page.waitForSelector(
      "project-list > div > div > div:nth-child(2) > div"
    );

    await expect(
      page.locator("project-list > div > div > div:nth-child(2) > div")
    ).toHaveCount(2);

    await expect(
      page.locator(
        "project-list > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div > a"
      )
    ).toContainText("Nth Project");

    console.log("On /projects there are two projects in correct order.");
  });

  test("case 3", async ({ page }) => {
    //Steps:
    // - Add key with just required fields
    //Expected result:
    // - Project page should be opened with just created key

    //  Deleting the Nth project, so there will be only one project
    await page.goto("https://app.stage.lokalise.cloud/");

    await page.waitForTimeout(4000);

    await page
      .locator("project-list > div > div > div:nth-child(2) > div")
      .first()
      .waitFor();

    await page
      .locator(
        "project-list > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div > a"
      )
      .click();

    await page
      .locator(
        "project-header > div > div > div > div > nav > ul > li:nth-child(9) > div:nth-child(1) > button"
      )
      .click();
    await page.locator("#menu-list-2-menuitem-3").click();

    await page.locator("a.btn.btn-danger.btn-outlined.project-delete").click();

    const name = await page
      .locator("h4 > div > strong:nth-child(2)")
      .innerHTML();

    await page
      .locator(
        "body > div.bootbox.modal.bootbox-prompt.in > div > div > div.modal-body > div > form > input"
      )
      .fill(name);

    await page.locator("button.btn.btn-danger.btn-outlined").click();

    await page.waitForSelector(
      "project-list > div > div > div:nth-child(2) > div"
    );

    await expect(
      page.locator("project-list > div > div > div:nth-child(2) > div")
    ).toHaveCount(1);

    console.log(
      "The Nth project was deleted. On /projects there is only one project."
    );

    // Adding first key
    await page
      .locator(
        "project-list > div > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(1)> div > nav > ul > li:nth-child(4) > div > div > button"
      )
      .click();

    page.locator("#menu-list-3-menuitem-4").click();

    await page.waitForLoadState();

    await page.locator('[aria-label="Add first key"]').click();

    await page.waitForTimeout(800);

    await page.locator('[placeholder="Give the key a unique ID"]').fill("123");

    await page.locator("#s2id_device-s").click();

    await page.locator("#select2-result-label-13").click();

    await page.locator("#btn_addkey").click();

    await page.waitForURL("**/project/**");

    console.log("Project's page is opened. The URL is " + page.url());

    const keyName = await page
      .locator(".row-key.row.flex.key-row-head")
      .getAttribute("data-name");

    console.log("Key is created. Its name is " + keyName + ".");
  });

  test("case 4", async ({ page }) => {
    //Steps:
    // - Add translation for the key
    //Expected result:
    // - Translation should appear in key

    //Transferring to the project's page
    await page.goto("https://app.stage.lokalise.cloud/");

    await page.waitForTimeout(4000);

    await page
      .locator(
        "project-list > div > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(1)> div > nav > ul > li:nth-child(4) > div > div > button"
      )
      .click();

    page.locator("#menu-list-3-menuitem-4").click();

    //Adding English translation
    page.waitForTimeout(1000);

    await page
      .locator(
        ".page.current > div:nth-child(1) > div.col-md-9 > table > tbody > tr:nth-child(1) > td:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div > div"
      )
      .click();

    await page
      .locator(
        "div.CodeMirror.cm-s-default.CodeMirror-wrap > div:nth-child(1) > textarea"
      )
      .fill("Test");

    await page.waitForTimeout(600);

    await page
      .locator(
        "div.editor-panel.bottom-panel > div.lokalise-tooltip.editor-tooltip.editor-button > button > img"
      )
      .click();

    await page.waitForTimeout(800);

    await page.locator("div.col-md-3 > div > div.break-word").hover();

    //Adding Afrikaans translation through Google Translate
    await page
      .locator("span.key-function-button.machine-all.fontello-google-circle")
      .click();

    //Checking that translation was added.

    await page.waitForTimeout(800);

    await expect(page.locator(".highlight-wrapper >> nth=0")).toContainText(
      "Test"
    );

    await expect(page.locator(".highlight-wrapper >> nth=1")).toContainText(
      "Toets"
    );

    console.log("Translation for the first key is added.");
  });

  test("case 5", async ({ page }) => {
    //Steps:
    // - Add translation for all plural forms of the key
    //Expected result:
    // - Translation should appear in key

    //Transferring to the project's page

    await page.goto("https://app.stage.lokalise.cloud/");

    await page.waitForTimeout(4000);

    await page
      .locator(
        "project-list > div > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(1)> div > nav > ul > li:nth-child(4) > div > div > button"
      )
      .click();

    page.locator("#menu-list-3-menuitem-4").click();

    //Adding one plural key
    await page.waitForLoadState();

    await page.locator("button:has-text('Add key')").click();

    await page.waitForTimeout(800);

    await page.locator('[placeholder="Give the key a unique ID"]').fill("124");

    await page.locator("#advanced_tab").click();

    await page
      .locator(
        "#addkey > div > div > div.modal-body > form > div > div:nth-child(8) > div.col-sm-3 > div > div > div > span.bootstrap-switch-handle-off.bootstrap-switch-default"
      )
      .click();

    await page.locator("#btn_addkey").click();

    // Adding translation for all plural forms of the key

    //English one
    await page
      .locator(
        ".page.current > div:nth-child(1) > div.col-md-9 > table > tbody > tr:nth-child(1) > td:nth-child(2) > div:nth-child(1) > div > div:nth-child(1) > span"
      )
      .click();

    await page
      .locator(
        "div.CodeMirror.cm-s-default.CodeMirror-wrap > div:nth-child(1) > textarea"
      )
      .fill("Test");

    await page.waitForTimeout(600);

    await page
      .locator(
        "div.editor-panel.bottom-panel > div.lokalise-tooltip.editor-tooltip.editor-button > button > img"
      )
      .click();

    //English other
    await page
      .locator(
        ".page.current > div:nth-child(1) > div.col-md-9 > table > tbody > tr:nth-child(1) > td:nth-child(2) > div:nth-child(1) > div > div:nth-child(2) > span"
      )
      .click();

    await page
      .locator(
        "div.CodeMirror.cm-s-default.CodeMirror-wrap > div:nth-child(1) > textarea"
      )
      .fill("Tests");

    await page.waitForTimeout(600);

    await page
      .locator(
        "div.editor-panel.bottom-panel > div.lokalise-tooltip.editor-tooltip.editor-button > button > img"
      )
      .click();

    // Afrikaans one
    await page
      .locator(
        ".page.current > div:nth-child(1) > div.col-md-9 > table > tbody > tr:nth-child(2) > td:nth-child(2) > div:nth-child(1) > div > div:nth-child(1) > span"
      )
      .click();

    await page
      .locator(
        "div.CodeMirror.cm-s-default.CodeMirror-wrap > div:nth-child(1) > textarea"
      )
      .fill("Toets");

    await page.waitForTimeout(600);

    await page
      .locator(
        "div.editor-panel.bottom-panel > div.lokalise-tooltip.editor-tooltip.editor-button > button > img"
      )
      .click();

    // Afrikaans other
    await page
      .locator(
        ".page.current > div:nth-child(1) > div.col-md-9 > table > tbody > tr:nth-child(2) > td:nth-child(2) > div:nth-child(1) > div > div:nth-child(2) > span"
      )
      .click();

    await page.waitForTimeout(600);

    await page
      .locator(
        "div.CodeMirror.cm-s-default.CodeMirror-wrap > div:nth-child(1) > textarea"
      )
      .fill("Toetse");

    await page.waitForTimeout(600);

    await page
      .locator(
        "div.editor-panel.bottom-panel > div.lokalise-tooltip.editor-tooltip.editor-button > button > img"
      )
      .click();

    await page.waitForTimeout(600);

    const keyEnglishOne = await page
      .locator(
        ".page.current > div:nth-child(1) > div.col-md-9 > table > tbody > tr:nth-child(1) > td:nth-child(2) > div > div > div:nth-child(1) > span > span"
      )
      .textContent();

    const keyEnglishOther = await page
      .locator(
        ".page.current > div:nth-child(1) > div.col-md-9 > table > tbody > tr:nth-child(1) > td:nth-child(2) > div > div > div:nth-child(2) > span > span"
      )
      .textContent();

    const keyAfrikaansOne = await page
      .locator(
        ".page.current > div:nth-child(1) > div.col-md-9 > table > tbody > tr:nth-child(2) > td:nth-child(2) > div > div > div:nth-child(1) > span > span"
      )
      .textContent();

    const keyAfrikaansOther = await page
      .locator(
        ".page.current > div:nth-child(1) > div.col-md-9 > table > tbody > tr:nth-child(2) > td:nth-child(2) > div > div > div:nth-child(2) > span > span"
      )
      .textContent();

    console.log(
      "Plural key was created. Translation for all plural forms of the key is added. Plural keywords are " +
        keyEnglishOne +
        ", " +
        keyEnglishOther +
        ", translations are " +
        keyAfrikaansOne +
        ", " +
        keyAfrikaansOther
    );
  });
});
