const { Builder, By, until, Key } = require("selenium-webdriver");

describe("Verify User Custom Field Functionality", function () {
  
  beforeEach(async function () {
    // Launch browser
    driver = await new Builder().forBrowser("chrome").build();

    // Maximize the window
    await driver.manage().window().maximize();

    // Navigate to application
    await driver.get("https://dev.klaarhq.com");
  });

  afterEach(async function () {
    // Close the browser after each tests are done
    await driver.quit();
  });

  //positive scenarios
  it("Verify User custom field - Date : Add/Display/Toggle", async function () {

    //Login
    const element = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-sign-in/nz-spin/div/div[1]/div[2]/div/div/div[3]/div'
        )
      ),
      20000
    ); 
    await element.click();
    await driver
      .findElement(By.id("email-field"))
      .sendKeys("deepa.nayak@gamma.klaar.team");
    await driver.findElement(By.id("password-field")).sendKeys("Klaar2021");
    await driver
      .findElement(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-sign-in/nz-spin/div/div[1]/div[2]/div/nz-spin/div/form/nz-form-item[2]/nz-form-control/div/div/nz-input-group/span'
        )
      )
      .click();
    await driver.findElement(By.id("login-btn")).click();
    console.log("Clicked on login");

    //Navigate to setting module
    const element1 = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-sider/div/div/div[1]/div[2]/ul/div[7]/button/li'
        )
      ),
      20000
    );
    await element1.click();
    console.log("Clicked on settings");

    await driver.sleep(1000);

    //Navigate to User list page
    await driver
      .findElement(By.xpath("//a[contains(text(),'User List')]"))
      .click();
    console.log("Clicked on user list page");

    //Navigate to the User Fields page.
    await driver
      .findElement(
        By.xpath(
          "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-employees[1]/app-page-container[1]/div[1]/div[1]/nz-tabset[1]/nz-tabs-nav[1]/div[1]/div[1]/div[3]"
        )
      )
      .click();
    console.log("Clicked on custom field");

    //Add a new custom field of type Date.
    await driver.sleep(2000);
    await driver
      .findElement(
        By.xpath(
          "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div[3]/div/button[2]/span[2]"
        )
      )
      .click();
    console.log("Clicked on add field");

    await driver
      .findElement(
        By.xpath(
          "//input[contains(@class, 'ant-input') and ancestor::div[contains(@id, 'cdk-overlay')]]"
        )
      )
      .sendKeys("Abrar-Test-Date");

    await driver
      .findElement(
        By.xpath(
          "//div[@id='cdk-overlay-0']/nz-modal-container/div/div/div/app-modal/div/div[2]/app-add-field-modal/div/nz-spin/div/div/div/form/nz-form-item[2]/nz-form-control/div/div/nz-select/nz-select-top-control/nz-select-search/input"
        )
      )
      .click();

    await driver
      .findElement(By.xpath("//nz-option-container//nz-option-item[6]"))
      .click();

    await driver
      .findElement(
        By.xpath(
          "//body/div[5]/div[2]/div[1]/nz-modal-container[1]/div[1]/div[1]/div[1]/app-modal[1]/div[1]/div[3]/div[1]/span[1]/button[1]"
        )
      )
      .click();
    console.log("Clicked on Submit");

    await driver.sleep(2000);

    //Verify that the added custom field is reflected in the user company details page
    await driver
      .findElement(
        By.xpath(
          "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-employees[1]/app-page-container[1]/div[1]/div[1]/nz-tabset[1]/nz-tabs-nav[1]/div[1]/div[1]/div[1]"
        )
      )
      .click();

    await driver.sleep(5000);
    await driver
      .findElement(
        By.xpath(
          "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div/div/div[2]/div/kr-table-v2/nz-table/nz-spin/div/div/nz-table-inner-scroll/div[2]/table/tbody/tr/td[2]/div/span"
        )
      )
      .click();

    await driver.sleep(4000);
    await driver
      .findElement(
        By.xpath(
          "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-profile-edit/app-page-container/div/div/div/div[2]/nz-tabset/nz-tabs-nav/div/div/div[2]/div"
        )
      )
      .click();
    console.log("Clicked on Company details");

    await driver.sleep(4000);
    await driver.findElement(
      By.xpath("//label[contains(text(), 'Abrar-Test-Date')]")
    );

    console.log('Label with text "Abrar-Test-Date" found.');

    await driver.sleep(2000);

    //In the user details page, add a future date in the custom field for the user and save.
    const datePicker = await driver.findElement(
      By.xpath(
        "//label[contains(text(), 'Abrar-Test-Date')]/ancestor::nz-form-label/following-sibling::nz-form-control//input"
      )
    );

    await driver.executeScript("arguments[0].scrollIntoView();", datePicker);

    await driver.sleep(2000);
    await datePicker.click();
    await datePicker.clear();
    await datePicker.sendKeys("2025-03-10");
    await driver.sleep(2000);
    await datePicker.sendKeys(Key.ENTER);
    await datePicker.sendKeys(Key.ENTER);
    console.log("selected future date");

    await driver
      .findElement(
        By.xpath(
          "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-profile-edit[1]/app-page-container[1]/div[1]/div[1]/div[1]/div[2]/nz-tabset[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/form[1]/nz-form-control[1]/div[1]/div[1]/div[1]/button[1]"
        )
      )
      .click();
    console.log("Date saved");

    await driver.sleep(3000);
    await driver
      .findElement(By.xpath("//nz-page-header-title/button[1]/i[1]"))
      .click();
    console.log("going back");

    //Test the custom field switch on/off toggle and verify changes are reflected respectively in the user company details page.
    await driver
      .findElement(
        By.xpath(
          "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-employees[1]/app-page-container[1]/div[1]/div[1]/nz-tabset[1]/nz-tabs-nav[1]/div[1]/div[1]/div[3]"
        )
      )
      .click();
    console.log("Again Clicked on custom field");

    await driver.sleep(5000);
    // await driver
    //   .findElement(
    //     By.xpath(
    //       '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div[3]/div[2]/nz-spin/div/kr-table-v2/nz-table/nz-spin/div/div/nz-table-inner-scroll/div[2]/table/tbody/tr[2]/td[3]/nz-switch/button'
    //     )
    //   )
    //   .click();

    await driver
      .findElement(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div[3]/div[2]/nz-spin/div/kr-table-v2/nz-table/nz-spin/div/div/nz-table-inner-scroll/div[2]/table/tbody/tr[1]/td[3]/nz-switch/button'
        )
      )
      .click();

    console.log("toggle switched off");

    await driver.sleep(2000);
    await driver
      .findElement(
        By.xpath(
          "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-employees[1]/app-page-container[1]/div[1]/div[1]/nz-tabset[1]/nz-tabs-nav[1]/div[1]/div[1]/div[1]"
        )
      )
      .click();

    await driver.sleep(5000);
    await driver
      .findElement(
        By.xpath(
          "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div/div/div[2]/div/kr-table-v2/nz-table/nz-spin/div/div/nz-table-inner-scroll/div[2]/table/tbody/tr/td[2]/div/span"
        )
      )
      .click();

    await driver.sleep(4000);
    await driver
      .findElement(
        By.xpath(
          "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-profile-edit/app-page-container/div/div/div/div[2]/nz-tabset/nz-tabs-nav/div/div/div[2]/div"
        )
      )
      .click();

    await driver.executeScript(
      "arguments[0].scrollIntoView();",
      await driver.findElement(
        By.xpath(
          "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-profile-edit[1]/app-page-container[1]/div[1]/div[1]/div[1]/div[2]/nz-tabset[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/form[1]/nz-form-control[1]/div[1]/div[1]/div[1]/button[1]"
        )
      )
    );

    try {
      await driver.sleep(3000);
      await driver.findElement(
        By.xpath("//label[contains(text(), 'Abrar-Test-Date')]")
      );
    } catch {
      console.log('Label with text "Abrar-Test-Date" not found.');
    }
  });

  it("Verify User custom field - List : Add/Display/Toggle", async function () {
    //Login
    const element = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-sign-in/nz-spin/div/div[1]/div[2]/div/div/div[3]/div'
        )
      ),
      20000
    ); 

    await element.click();
    await driver
      .findElement(By.id("email-field"))
      .sendKeys("deepa.nayak@gamma.klaar.team");
    await driver.findElement(By.id("password-field")).sendKeys("Klaar2021");
    await driver
      .findElement(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-sign-in/nz-spin/div/div[1]/div[2]/div/nz-spin/div/form/nz-form-item[2]/nz-form-control/div/div/nz-input-group/span'
        )
      )
      .click();
    await driver.findElement(By.id("login-btn")).click();
    console.log("Clicked on login");

    const element1 = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-sider/div/div/div[1]/div[2]/ul/div[7]/button/li'
        )
      ),
      20000
    );

    //Navigate to Settings module
    await element1.click();
    console.log("Clicked on settings");

    await driver.sleep(1000);

    //Navigate to the User List page.
    await driver
      .findElement(By.xpath("//a[contains(text(),'User List')]"))
      .click();
    console.log("Clicked on user list");

    //Navigate to the User Field page.
    await driver
      .findElement(
        By.xpath(
          "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-employees[1]/app-page-container[1]/div[1]/div[1]/nz-tabset[1]/nz-tabs-nav[1]/div[1]/div[1]/div[3]"
        )
      )
      .click();
    console.log("Clicked on custom field");

    await driver.sleep(2000);
    await driver
      .findElement(
        By.xpath(
          "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div[3]/div/button[2]/span[2]"
        )
      )
      .click();
    console.log("Clicked on add field");
    await driver
      .findElement(
        By.xpath(
          "//input[contains(@class, 'ant-input') and ancestor::div[contains(@id, 'cdk-overlay')]]"
        )
      )
      .sendKeys("Abrar-Test-List");
    await driver.sleep(5000);

    await driver
      .findElement(
        By.xpath(
          "//div[@id='cdk-overlay-0']/nz-modal-container/div/div/div/app-modal/div/div[2]/app-add-field-modal/div/nz-spin/div/div/div/form/nz-form-item[2]/nz-form-control/div/div/nz-select/nz-select-top-control/nz-select-search/input"
        )
      )
      .click();
    await driver.sleep(2000);
    await driver
      .findElement(By.xpath("//nz-option-container//nz-option-item[4]"))
      .click();
    await driver.sleep(2000);
    await driver
      .findElement(
        By.xpath(
          "//body/div[5]/div[2]/div[1]/nz-modal-container[1]/div[1]/div[1]/div[1]/app-modal[1]/div[1]/div[2]/app-add-field-modal[1]/div[1]/nz-spin[1]/div[1]/div[2]/div[1]/div[1]/div[2]/button[1]"
        )
      )
      .click();

    await driver.sleep(2000);
    await driver
      .findElement(
        By.xpath(
          "//body/div[5]/div[2]/div[1]/nz-modal-container[1]/div[1]/div[1]/div[1]/app-modal[1]/div[1]/div[2]/app-add-field-modal[1]/div[1]/nz-spin[1]/div[1]/div[2]/div[1]/div[1]/div[2]/button[1]"
        )
      )
      .click();

    //Add a new custom field of type List with 3 list options.
    await driver.sleep(2000);
    await driver
      .findElement(
        By.xpath(
          "//body/div[5]/div[2]/div[1]/nz-modal-container[1]/div[1]/div[1]/div[1]/app-modal[1]/div[1]/div[2]/app-add-field-modal[1]/div[1]/nz-spin[1]/div[1]/div[2]/div[2]/div[1]/div[1]/input[1]"
        )
      )
      .sendKeys("list1");

    await driver.sleep(2000);
    await driver
      .findElement(
        By.xpath(
          "//body/div[5]/div[2]/div[1]/nz-modal-container[1]/div[1]/div[1]/div[1]/app-modal[1]/div[1]/div[2]/app-add-field-modal[1]/div[1]/nz-spin[1]/div[1]/div[2]/div[2]/div[2]/div[1]/input[1]"
        )
      )
      .sendKeys("list2");

    await driver.sleep(2000);
    await driver
      .findElement(
        By.xpath(
          "//body/div[5]/div[2]/div[1]/nz-modal-container[1]/div[1]/div[1]/div[1]/app-modal[1]/div[1]/div[2]/app-add-field-modal[1]/div[1]/nz-spin[1]/div[1]/div[2]/div[2]/div[3]/div[1]/input[1]"
        )
      )
      .sendKeys("list3");

    await driver.sleep(2000);
    await driver
      .findElement(
        By.xpath(
          "//body/div[5]/div[2]/div[1]/nz-modal-container[1]/div[1]/div[1]/div[1]/app-modal[1]/div[1]/div[3]/div[1]/span[1]/button[1]"
        )
      )
      .click();
    console.log("Clicked on Submit");

    await driver.sleep(2000);

    //Verify that the added custom field is reflected in the user company details page.
    await driver
      .findElement(
        By.xpath(
          "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-employees[1]/app-page-container[1]/div[1]/div[1]/nz-tabset[1]/nz-tabs-nav[1]/div[1]/div[1]/div[1]"
        )
      )
      .click();
    console.log("Clicked All users");

    await driver.sleep(5000);
    await driver
      .findElement(
        By.xpath(
          "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div/div/div[2]/div/kr-table-v2/nz-table/nz-spin/div/div/nz-table-inner-scroll/div[2]/table/tbody/tr/td[2]/div/span"
        )
      )
      .click();
    await driver.sleep(4000);
    await driver
      .findElement(
        By.xpath(
          "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-profile-edit/app-page-container/div/div/div/div[2]/nz-tabset/nz-tabs-nav/div/div/div[2]/div"
        )
      )
      .click();
    console.log("Clicked on Company details");

    //In the user details page, select a list item for the custom field and save.
    await driver.sleep(4000);
    await driver.findElement(
      By.xpath("//label[contains(text(), 'Abrar-Test-List')]")
    );

    console.log('Label with text "Abrar-Test-List" found.');

    await driver.sleep(2000);

    const listPicker = await driver.findElement(
      By.xpath(
        "//label[contains(text(), 'Abrar-Test-List')]/ancestor::nz-form-label/following-sibling::nz-form-control//input"
      )
    );

    await driver.executeScript("arguments[0].scrollIntoView();", listPicker);

    await driver.sleep(2000);
    await listPicker.click();
    await driver
      .findElement(
        By.xpath(
          '//*[@id="cdk-overlay-2"]/nz-option-container/div/cdk-virtual-scroll-viewport/div[1]/nz-option-item[2]/div'
        )
      )
      .click();
    await driver
      .findElement(
        By.xpath(
          "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-profile-edit[1]/app-page-container[1]/div[1]/div[1]/div[1]/div[2]/nz-tabset[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/form[1]/nz-form-control[1]/div[1]/div[1]/div[1]/button[1]"
        )
      )
      .click();
    console.log("list item saved");

    await driver.sleep(3000);
    await driver
      .findElement(By.xpath("//nz-page-header-title/button[1]/i[1]"))
      .click();
    console.log("go back");

    await driver
      .findElement(
        By.xpath(
          "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-employees[1]/app-page-container[1]/div[1]/div[1]/nz-tabset[1]/nz-tabs-nav[1]/div[1]/div[1]/div[3]"
        )
      )
      .click();
    console.log("Again Clicked on custom field");

    await driver.sleep(5000);
    //  await driver
    //    .findElement(
    //      By.xpath(
    //        '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div[3]/div[2]/nz-spin/div/kr-table-v2/nz-table/nz-spin/div/div/nz-table-inner-scroll/div[2]/table/tbody/tr[2]/td[3]/nz-switch/button'
    //      )
    //    )
    //    .click();

    //10. Test the custom field switch on/off toggle and verify changes are reflected respectively in the user company details page.
    await driver
      .findElement(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div[3]/div[2]/nz-spin/div/kr-table-v2/nz-table/nz-spin/div/div/nz-table-inner-scroll/div[2]/table/tbody/tr[2]/td[3]/nz-switch/button'
        )
      )
      .click();

    console.log("switched off");

    await driver.sleep(2000);
    await driver
      .findElement(
        By.xpath(
          "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-employees[1]/app-page-container[1]/div[1]/div[1]/nz-tabset[1]/nz-tabs-nav[1]/div[1]/div[1]/div[1]"
        )
      )
      .click();

    await driver.sleep(5000);
    await driver
      .findElement(
        By.xpath(
          "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div/div/div[2]/div/kr-table-v2/nz-table/nz-spin/div/div/nz-table-inner-scroll/div[2]/table/tbody/tr/td[2]/div/span"
        )
      )
      .click();

    await driver.sleep(4000);
    await driver
      .findElement(
        By.xpath(
          "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-profile-edit/app-page-container/div/div/div/div[2]/nz-tabset/nz-tabs-nav/div/div/div[2]/div"
        )
      )
      .click();

    await driver.executeScript(
      "arguments[0].scrollIntoView();",
      await driver.findElement(
        By.xpath(
          "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-profile-edit[1]/app-page-container[1]/div[1]/div[1]/div[1]/div[2]/nz-tabset[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/form[1]/nz-form-control[1]/div[1]/div[1]/div[1]/button[1]"
        )
      )
    );

    try {
      await driver.sleep(3000);
      await driver.findElement(
        By.xpath(
          "//label[contains(text(), 'Abrar-Test-List')]/ancestor::nz-form-label/following-sibling::nz-form-control//input"
        )
      );
    } catch {
      console.log('List picker with text "Abrar-Test-List" not found');
    }
  });

  it("Verify User custom field - Date/List Deletion", async function () {
    // Login
    const element = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-sign-in/nz-spin/div/div[1]/div[2]/div/div/div[3]/div'
        )
      ),
      20000
    );

    await element.click();
    await driver
      .findElement(By.id("email-field"))
      .sendKeys("deepa.nayak@gamma.klaar.team");
    await driver.findElement(By.id("password-field")).sendKeys("Klaar2021");
    await driver
      .findElement(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-sign-in/nz-spin/div/div[1]/div[2]/div/nz-spin/div/form/nz-form-item[2]/nz-form-control/div/div/nz-input-group/span'
        )
      )
      .click();
    await driver.findElement(By.id("login-btn")).click();
    console.log("Clicked on login");

    const element1 = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-sider/div/div/div[1]/div[2]/ul/div[7]/button/li'
        )
      ),
      20000
    );

    //Navigate to the Settings module.
    await element1.click();
    console.log("Clicked on settings");

    await driver.sleep(1000);

    //Navigate to the User List page.
    await driver
      .findElement(By.xpath("//a[contains(text(),'User List')]"))
      .click();
    console.log("Clicked on user list");

    //Navigate to the User Fields page.
    await driver
      .findElement(
        By.xpath(
          "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-employees[1]/app-page-container[1]/div[1]/div[1]/nz-tabset[1]/nz-tabs-nav[1]/div[1]/div[1]/div[3]"
        )
      )
      .click();
    console.log("Clicked on custom field");

    await driver.sleep(5000);

    //Delete the custom field and verify the custom field is no longer visible in the custom field table as well as the user company details page.
    await driver
      .findElement(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div[3]/div[2]/nz-spin/div/kr-table-v2/nz-table/nz-spin/div/div/nz-table-inner-scroll/div[2]/table/tbody/tr[1]/td[4]/div/div[2]'
        )
      )
      .click();

    await driver
      .findElement(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div[3]/div[2]/nz-spin/div/kr-table-v2/nz-table/nz-spin/div/div/nz-table-inner-scroll/div[2]/table/tbody/tr[2]/td[4]/div/div[2]'
        )
      )
      .click();

    console.log("Deleted");

    //verify the custom field is no longer visible in the custom field table as well as the user company details page.
    await driver.sleep(2000);
    await driver
      .findElement(
        By.xpath(
          "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-employees[1]/app-page-container[1]/div[1]/div[1]/nz-tabset[1]/nz-tabs-nav[1]/div[1]/div[1]/div[1]"
        )
      )
      .click();

    await driver.sleep(5000);
    await driver
      .findElement(
        By.xpath(
          "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div/div/div[2]/div/kr-table-v2/nz-table/nz-spin/div/div/nz-table-inner-scroll/div[2]/table/tbody/tr/td[2]/div/span"
        )
      )
      .click();

    await driver.sleep(4000);
    await driver
      .findElement(
        By.xpath(
          "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-profile-edit/app-page-container/div/div/div/div[2]/nz-tabset/nz-tabs-nav/div/div/div[2]/div"
        )
      )
      .click();

    await driver.executeScript(
      "arguments[0].scrollIntoView();",
      await driver.findElement(
        By.xpath(
          "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-profile-edit[1]/app-page-container[1]/div[1]/div[1]/div[1]/div[2]/nz-tabset[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/form[1]/nz-form-control[1]/div[1]/div[1]/div[1]/button[1]"
        )
      )
    );

    try {
      await driver.sleep(3000);
      await driver.findElement(
        By.xpath(
          "//label[contains(text(), 'Abrar-Test-List')]/ancestor::nz-form-label/following-sibling::nz-form-control//input"
        )
      );
    } catch {
      console.log('List picker with text "Abrar-Test-List" not found');
    }

    try {
      await driver.sleep(3000);
      await driver.findElement(
        By.xpath("//label[contains(text(), 'Abrar-Test-Date')]")
      );
    } catch {
      console.log('Label with text "Abrar-Test-Date" not found.');
    }
  });


  //Negative scenario
  it("Verify User add custom field without saving it", async function () {
    //Login
    const element = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-sign-in/nz-spin/div/div[1]/div[2]/div/div/div[3]/div'
        )
      ),
      20000
    );
    await element.click();
    await driver
      .findElement(By.id("email-field"))
      .sendKeys("deepa.nayak@gamma.klaar.team");
    await driver.findElement(By.id("password-field")).sendKeys("Klaar2021");
    await driver
      .findElement(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-sign-in/nz-spin/div/div[1]/div[2]/div/nz-spin/div/form/nz-form-item[2]/nz-form-control/div/div/nz-input-group/span'
        )
      )
      .click();
    await driver.findElement(By.id("login-btn")).click();
    console.log("Clicked on login");

    const element1 = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-sider/div/div/div[1]/div[2]/ul/div[7]/button/li'
        )
      ),
      20000
    );
    await element1.click();
    console.log("Clicked on settings");

    await driver.sleep(1000);

    await driver
      .findElement(By.xpath("//a[contains(text(),'User List')]"))
      .click();
    console.log("Clicked on user list");

    await driver
      .findElement(
        By.xpath(
          "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-employees[1]/app-page-container[1]/div[1]/div[1]/nz-tabset[1]/nz-tabs-nav[1]/div[1]/div[1]/div[3]"
        )
      )
      .click();
    console.log("Clicked on custom field");

    await driver.sleep(2000);
    await driver
      .findElement(
        By.xpath(
          "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div[3]/div/button[2]/span[2]"
        )
      )
      .click();
    console.log("Clicked on add field");

    await driver
      .findElement(
        By.xpath(
          "//input[contains(@class, 'ant-input') and ancestor::div[contains(@id, 'cdk-overlay')]]"
        )
      )
      .sendKeys("Abrar-Test-Date");

    await driver
      .findElement(
        By.xpath(
          "//div[@id='cdk-overlay-0']/nz-modal-container/div/div/div/app-modal/div/div[2]/app-add-field-modal/div/nz-spin/div/div/div/form/nz-form-item[2]/nz-form-control/div/div/nz-select/nz-select-top-control/nz-select-search/input"
        )
      )
      .click();

    await driver
      .findElement(By.xpath("//nz-option-container//nz-option-item[6]"))
      .click();

    await driver
      .findElement(
        By.xpath(
          "//body/div[5]/div[2]/div[1]/nz-modal-container[1]/div[1]/div[1]/div[1]/app-modal[1]/div[1]/div[3]/div[1]/a[1]"
        )
      )
      .click();
    console.log("Clicked on Cancel");

    await driver.sleep(2000);
    await driver
      .findElement(
        By.xpath(
          "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-employees[1]/app-page-container[1]/div[1]/div[1]/nz-tabset[1]/nz-tabs-nav[1]/div[1]/div[1]/div[1]"
        )
      )
      .click();

    await driver.sleep(5000);
    await driver
      .findElement(
        By.xpath(
          "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div/div/div[2]/div/kr-table-v2/nz-table/nz-spin/div/div/nz-table-inner-scroll/div[2]/table/tbody/tr/td[2]/div/span"
        )
      )
      .click();

    await driver.sleep(4000);
    await driver
      .findElement(
        By.xpath(
          "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-profile-edit/app-page-container/div/div/div/div[2]/nz-tabset/nz-tabs-nav/div/div/div[2]/div"
        )
      )
      .click();

    await driver.executeScript(
      "arguments[0].scrollIntoView();",
      await driver.findElement(
        By.xpath(
          "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-profile-edit[1]/app-page-container[1]/div[1]/div[1]/div[1]/div[2]/nz-tabset[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/form[1]/nz-form-control[1]/div[1]/div[1]/div[1]/button[1]"
        )
      )
    );

    try {
      await driver.sleep(3000);
      await driver.findElement(
        By.xpath("//label[contains(text(), 'Abrar-Test-Date')]")
      );
    } catch {
      console.log('Label with text "Abrar-Test-Date" not found.');
    }
  });

});
