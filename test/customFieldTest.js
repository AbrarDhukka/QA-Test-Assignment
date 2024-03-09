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
    //await driver.quit();
  });

  it("Verify User custom field - Date : Add/Display/Toggle/Delete",  async function(){
    // Wait until the element is visible (adjust the timeout as needed)
    const element = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-sign-in/nz-spin/div/div[1]/div[2]/div/div/div[3]/div'
        )
      ),
      20000
    ); // 10000 milliseconds (10 seconds) timeout as an example

    // Perform task
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

    // 1. First input field
    await driver
      .findElement(
        By.xpath(
          "//input[contains(@class, 'ant-input') and ancestor::div[contains(@id, 'cdk-overlay')]]"
        )
      )
      .sendKeys("Abrar-Test-Date");
    console.log("Entered name in 1st input field");

    // 2. Second input field
    await driver
      .findElement(
        By.xpath(
          "//div[@id='cdk-overlay-0']/nz-modal-container/div/div/div/app-modal/div/div[2]/app-add-field-modal/div/nz-spin/div/div/div/form/nz-form-item[2]/nz-form-control/div/div/nz-select/nz-select-top-control/nz-select-search/input"
        )
      )
      .click();

    // 3. Selecting option from the second input field
    await driver
      .findElement(By.xpath("//nz-option-container//nz-option-item[6]"))
      .click();
    console.log("Select Date from 2nd field");

    await driver
      .findElement(
        By.xpath(
          "//body/div[5]/div[2]/div[1]/nz-modal-container[1]/div[1]/div[1]/div[1]/app-modal[1]/div[1]/div[3]/div[1]/span[1]/button[1]"
        )
      )
      .click();
    console.log("Clicked on Submit");

    await driver.sleep(2000);
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
    console.log("Clicked on 1st users");

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

    console.log("switched off");

    await driver.sleep(2000);
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
    console.log("Clicked on 1st users");

    await driver.sleep(4000);
    await driver
      .findElement(
        By.xpath(
          "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-profile-edit/app-page-container/div/div/div/div[2]/nz-tabset/nz-tabs-nav/div/div/div[2]/div"
        )
      )
      .click();
    console.log("Clicked on Company details");

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

  })

  it("Verify User custom field - List : Add/Display/Toggle/Delete",  async function(){
   // Wait until the element is visible (adjust the timeout as needed)
   const element = await driver.wait(
    until.elementLocated(
      By.xpath(
        '//*[@id="main-app"]/app-root/app-sign-in/nz-spin/div/div[1]/div[2]/div/div/div[3]/div'
      )
    ),
    20000
  ); // 10000 milliseconds (10 seconds) timeout as an example

  // Perform task
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

   // 1. First input field
   await driver
   .findElement(
     By.xpath(
       "//input[contains(@class, 'ant-input') and ancestor::div[contains(@id, 'cdk-overlay')]]"
     )
   )
   .sendKeys("Abrar-Test-List");
 console.log("Clicked on 1st input field");

 await driver.sleep(5000);


 await driver
   .findElement(
     By.xpath(
       "//div[@id='cdk-overlay-0']/nz-modal-container/div/div/div/app-modal/div/div[2]/app-add-field-modal/div/nz-spin/div/div/div/form/nz-form-item[2]/nz-form-control/div/div/nz-select/nz-select-top-control/nz-select-search/input"
     )
   )
   .click();
 console.log("Clicked on 2nd input field");

 // 3. Selecting option from the second input field
 await driver.sleep(2000);
 await driver
   .findElement(By.xpath("//nz-option-container//nz-option-item[4]"))
   .click();
 console.log("Selected from 2nd input field");

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
 console.log("Clicked on 1st users");

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
   By.xpath("//label[contains(text(), 'Abrar-Test-List')]")
 );

 console.log('Label with text "Abrar-Test-List" found.');

 await driver.sleep(2000);

 const listPicker = await driver.findElement(
   By.xpath(
     "//label[contains(text(), 'Abrar-Test-List')]/ancestor::nz-form-label/following-sibling::nz-form-control//input"
   )
 );
 console.log("Listpicker found");

 await driver.executeScript("arguments[0].scrollIntoView();", listPicker);

 await driver.sleep(2000);
 await listPicker.click();
 console.log("list clicked");

 await driver
   .findElement(
     By.xpath(
       '//*[@id="cdk-overlay-2"]/nz-option-container/div/cdk-virtual-scroll-viewport/div[1]/nz-option-item[2]/div'
     )
   )
   .click();
 console.log("list item selected");

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
 console.log("going back");

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
 console.log("Clicked All users");

 await driver.sleep(5000);
 await driver
   .findElement(
     By.xpath(
       "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div/div/div[2]/div/kr-table-v2/nz-table/nz-spin/div/div/nz-table-inner-scroll/div[2]/table/tbody/tr/td[2]/div/span"
     )
   )
   .click();
 console.log("Clicked on 1st users");

 await driver.sleep(4000);
 await driver
   .findElement(
     By.xpath(
       "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-profile-edit/app-page-container/div/div/div/div[2]/nz-tabset/nz-tabs-nav/div/div/div[2]/div"
     )
   )
   .click();
 console.log("Clicked on Company details");

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

  })

    
  // it("Verify User Custom Fields - Date", async function () {
    
  //   // Wait until the element is visible (adjust the timeout as needed)
  //   const element = await driver.wait(
  //     until.elementLocated(
  //       By.xpath(
  //         '//*[@id="main-app"]/app-root/app-sign-in/nz-spin/div/div[1]/div[2]/div/div/div[3]/div'
  //       )
  //     ),
  //     20000
  //   ); // 10000 milliseconds (10 seconds) timeout as an example

  //   // Perform task
  //   await element.click();
  //   await driver
  //     .findElement(By.id("email-field"))
  //     .sendKeys("deepa.nayak@gamma.klaar.team");
  //   await driver.findElement(By.id("password-field")).sendKeys("Klaar2021");
  //   await driver
  //     .findElement(
  //       By.xpath(
  //         '//*[@id="main-app"]/app-root/app-sign-in/nz-spin/div/div[1]/div[2]/div/nz-spin/div/form/nz-form-item[2]/nz-form-control/div/div/nz-input-group/span'
  //       )
  //     )
  //     .click();
  //   await driver.findElement(By.id("login-btn")).click();
  //   console.log("Clicked on login");

  //   const element1 = await driver.wait(
  //     until.elementLocated(
  //       By.xpath(
  //         '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-sider/div/div/div[1]/div[2]/ul/div[7]/button/li'
  //       )
  //     ),
  //     20000
  //   );
  //   await element1.click();
  //   console.log("Clicked on settings");

  //   await driver.sleep(1000);

  //   await driver
  //     .findElement(By.xpath("//a[contains(text(),'User List')]"))
  //     .click();
  //   console.log("Clicked on user list");

  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-employees[1]/app-page-container[1]/div[1]/div[1]/nz-tabset[1]/nz-tabs-nav[1]/div[1]/div[1]/div[3]"
  //       )
  //     )
  //     .click();
  //   console.log("Clicked on custom field");

  //   await driver.sleep(2000);
  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div[3]/div/button[2]/span[2]"
  //       )
  //     )
  //     .click();
  //   console.log("Clicked on add field");

  //   // 1. First input field
  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//input[contains(@class, 'ant-input') and ancestor::div[contains(@id, 'cdk-overlay')]]"
  //       )
  //     )
  //     .sendKeys("Abrar-Test-Date");
  //   console.log("Entered name in 1st input field");

  //   // 2. Second input field
  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//div[@id='cdk-overlay-0']/nz-modal-container/div/div/div/app-modal/div/div[2]/app-add-field-modal/div/nz-spin/div/div/div/form/nz-form-item[2]/nz-form-control/div/div/nz-select/nz-select-top-control/nz-select-search/input"
  //       )
  //     )
  //     .click();

  //   // 3. Selecting option from the second input field
  //   await driver
  //     .findElement(By.xpath("//nz-option-container//nz-option-item[6]"))
  //     .click();
  //   console.log("Select Date from 2nd field");

  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//body/div[5]/div[2]/div[1]/nz-modal-container[1]/div[1]/div[1]/div[1]/app-modal[1]/div[1]/div[3]/div[1]/span[1]/button[1]"
  //       )
  //     )
  //     .click();
  //   console.log("Clicked on Submit");

  //   await driver.sleep(2000);
  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-employees[1]/app-page-container[1]/div[1]/div[1]/nz-tabset[1]/nz-tabs-nav[1]/div[1]/div[1]/div[1]"
  //       )
  //     )
  //     .click();
  //   console.log("Clicked All users");

  //   await driver.sleep(5000);
  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div/div/div[2]/div/kr-table-v2/nz-table/nz-spin/div/div/nz-table-inner-scroll/div[2]/table/tbody/tr/td[2]/div/span"
  //       )
  //     )
  //     .click();
  //   console.log("Clicked on 1st users");

  //   await driver.sleep(4000);
  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-profile-edit/app-page-container/div/div/div/div[2]/nz-tabset/nz-tabs-nav/div/div/div[2]/div"
  //       )
  //     )
  //     .click();
  //   console.log("Clicked on Company details");

  //   await driver.sleep(4000);
  //   await driver.findElement(
  //     By.xpath("//label[contains(text(), 'Abrar-Test-Date')]")
  //   );

  //   console.log('Label with text "Abrar-Test-Date" found.');

  //   await driver.sleep(2000);

  //   const datePicker = await driver.findElement(
  //     By.xpath(
  //       "//label[contains(text(), 'Abrar-Test-Date')]/ancestor::nz-form-label/following-sibling::nz-form-control//input"
  //     )
  //   );

  //   await driver.executeScript("arguments[0].scrollIntoView();", datePicker);

  //   await driver.sleep(2000);
  //   await datePicker.click();
  //   await datePicker.clear();
  //   await datePicker.sendKeys("2025-03-10");
  //   await driver.sleep(2000);
  //   await datePicker.sendKeys(Key.ENTER);
  //   await datePicker.sendKeys(Key.ENTER);
  //   console.log("selected future date");

  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-profile-edit[1]/app-page-container[1]/div[1]/div[1]/div[1]/div[2]/nz-tabset[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/form[1]/nz-form-control[1]/div[1]/div[1]/div[1]/button[1]"
  //       )
  //     )
  //     .click();
  //   console.log("Date saved");

  //   await driver.sleep(3000);
  //   await driver
  //     .findElement(By.xpath("//nz-page-header-title/button[1]/i[1]"))
  //     .click();
  //   console.log("going back");

  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-employees[1]/app-page-container[1]/div[1]/div[1]/nz-tabset[1]/nz-tabs-nav[1]/div[1]/div[1]/div[3]"
  //       )
  //     )
  //     .click();
  //   console.log("Again Clicked on custom field");

  //   await driver.sleep(2000);
  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div[3]/div/button[2]/span[2]"
  //       )
  //     )
  //     .click();
  //   console.log("Clicked on add field");

  //   // 1. First input field
  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//input[contains(@class, 'ant-input') and ancestor::div[contains(@id, 'cdk-overlay')]]"
  //       )
  //     )
  //     .sendKeys("Abrar-Test-List");
  //   console.log("Clicked on 1st input field");

  //   await driver.sleep(5000);

  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//div[@id='cdk-overlay-3']/nz-modal-container/div/div/div/app-modal/div/div[2]/app-add-field-modal/div/nz-spin/div/div/div/form/nz-form-item[2]/nz-form-control/div/div/nz-select/nz-select-top-control/nz-select-search/input"
  //       )
  //     )
  //     .click();
  //   console.log("Clicked on 2nd input field");

  //   // 3. Selecting option from the second input field
  //   await driver.sleep(2000);
  //   await driver
  //     .findElement(By.xpath("//nz-option-container//nz-option-item[4]"))
  //     .click();
  //   console.log("Selected from 2nd input field");

  //   await driver.sleep(2000);
  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//body/div[5]/div[2]/div[1]/nz-modal-container[1]/div[1]/div[1]/div[1]/app-modal[1]/div[1]/div[2]/app-add-field-modal[1]/div[1]/nz-spin[1]/div[1]/div[2]/div[1]/div[1]/div[2]/button[1]"
  //       )
  //     )
  //     .click();

  //   await driver.sleep(2000);
  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//body/div[5]/div[2]/div[1]/nz-modal-container[1]/div[1]/div[1]/div[1]/app-modal[1]/div[1]/div[2]/app-add-field-modal[1]/div[1]/nz-spin[1]/div[1]/div[2]/div[1]/div[1]/div[2]/button[1]"
  //       )
  //     )
  //     .click();

  //   await driver.sleep(2000);
  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//body/div[5]/div[2]/div[1]/nz-modal-container[1]/div[1]/div[1]/div[1]/app-modal[1]/div[1]/div[2]/app-add-field-modal[1]/div[1]/nz-spin[1]/div[1]/div[2]/div[2]/div[1]/div[1]/input[1]"
  //       )
  //     )
  //     .sendKeys("list1");

  //   await driver.sleep(2000);
  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//body/div[5]/div[2]/div[1]/nz-modal-container[1]/div[1]/div[1]/div[1]/app-modal[1]/div[1]/div[2]/app-add-field-modal[1]/div[1]/nz-spin[1]/div[1]/div[2]/div[2]/div[2]/div[1]/input[1]"
  //       )
  //     )
  //     .sendKeys("list2");

  //   await driver.sleep(2000);
  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//body/div[5]/div[2]/div[1]/nz-modal-container[1]/div[1]/div[1]/div[1]/app-modal[1]/div[1]/div[2]/app-add-field-modal[1]/div[1]/nz-spin[1]/div[1]/div[2]/div[2]/div[3]/div[1]/input[1]"
  //       )
  //     )
  //     .sendKeys("list3");

  //   await driver.sleep(2000);
  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//body/div[5]/div[2]/div[1]/nz-modal-container[1]/div[1]/div[1]/div[1]/app-modal[1]/div[1]/div[3]/div[1]/span[1]/button[1]"
  //       )
  //     )
  //     .click();
  //   console.log("Clicked on Submit");

  //   await driver.sleep(2000);
  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-employees[1]/app-page-container[1]/div[1]/div[1]/nz-tabset[1]/nz-tabs-nav[1]/div[1]/div[1]/div[1]"
  //       )
  //     )
  //     .click();
  //   console.log("Clicked All users");

  //   await driver.sleep(5000);
  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div/div/div[2]/div/kr-table-v2/nz-table/nz-spin/div/div/nz-table-inner-scroll/div[2]/table/tbody/tr/td[2]/div/span"
  //       )
  //     )
  //     .click();
  //   console.log("Clicked on 1st users");

  //   await driver.sleep(4000);
  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-profile-edit/app-page-container/div/div/div/div[2]/nz-tabset/nz-tabs-nav/div/div/div[2]/div"
  //       )
  //     )
  //     .click();
  //   console.log("Clicked on Company details");

  //   await driver.sleep(4000);
  //   await driver.findElement(
  //     By.xpath("//label[contains(text(), 'Abrar-Test-List')]")
  //   );

  //   console.log('Label with text "Abrar-Test-List" found.');

  //   await driver.sleep(2000);

  //   const listPicker = await driver.findElement(
  //     By.xpath(
  //       "//label[contains(text(), 'Abrar-Test-List')]/ancestor::nz-form-label/following-sibling::nz-form-control//input"
  //     )
  //   );
  //   console.log("Listpicker found");

  //   await driver.executeScript("arguments[0].scrollIntoView();", listPicker);

  //   await driver.sleep(2000);
  //   await listPicker.click();
  //   console.log("list clicked");

  //   await driver
  //     .findElement(
  //       By.xpath(
  //         '//*[@id="cdk-overlay-5"]/nz-option-container/div/cdk-virtual-scroll-viewport/div[1]/nz-option-item[2]/div'
  //       )
  //     )
  //     .click();
  //   console.log("list item selected");

  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-profile-edit[1]/app-page-container[1]/div[1]/div[1]/div[1]/div[2]/nz-tabset[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/form[1]/nz-form-control[1]/div[1]/div[1]/div[1]/button[1]"
  //       )
  //     )
  //     .click();
  //   console.log("list item saved");

  //   await driver.sleep(3000);
  //   await driver
  //     .findElement(By.xpath("//nz-page-header-title/button[1]/i[1]"))
  //     .click();
  //   console.log("going back");

  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-employees[1]/app-page-container[1]/div[1]/div[1]/nz-tabset[1]/nz-tabs-nav[1]/div[1]/div[1]/div[3]"
  //       )
  //     )
  //     .click();
  //   console.log("Again Clicked on custom field");

  //   await driver.sleep(5000);
  //   await driver
  //     .findElement(
  //       By.xpath(
  //         '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div[3]/div[2]/nz-spin/div/kr-table-v2/nz-table/nz-spin/div/div/nz-table-inner-scroll/div[2]/table/tbody/tr[2]/td[3]/nz-switch/button'
  //       )
  //     )
  //     .click();

  //   await driver
  //     .findElement(
  //       By.xpath(
  //         '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div[3]/div[2]/nz-spin/div/kr-table-v2/nz-table/nz-spin/div/div/nz-table-inner-scroll/div[2]/table/tbody/tr[1]/td[3]/nz-switch/button'
  //       )
  //     )
  //     .click();

  //   console.log("switched off");

  //   await driver.sleep(2000);
  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-employees[1]/app-page-container[1]/div[1]/div[1]/nz-tabset[1]/nz-tabs-nav[1]/div[1]/div[1]/div[1]"
  //       )
  //     )
  //     .click();
  //   console.log("Clicked All users");

  //   await driver.sleep(5000);
  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-employees/app-page-container/div/div/nz-tabset/div/div/div/div/div[2]/div/kr-table-v2/nz-table/nz-spin/div/div/nz-table-inner-scroll/div[2]/table/tbody/tr/td[2]/div/span"
  //       )
  //     )
  //     .click();
  //   console.log("Clicked on 1st users");

  //   await driver.sleep(4000);
  //   await driver
  //     .findElement(
  //       By.xpath(
  //         "//div[@id='main-app']/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-profile-edit/app-page-container/div/div/div/div[2]/nz-tabset/nz-tabs-nav/div/div/div[2]/div"
  //       )
  //     )
  //     .click();
  //   console.log("Clicked on Company details");

  //   await driver.executeScript(
  //     "arguments[0].scrollIntoView();",
  //     await driver.findElement(
  //       By.xpath(
  //         "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-profile-edit[1]/app-page-container[1]/div[1]/div[1]/div[1]/div[2]/nz-tabset[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/form[1]/nz-form-control[1]/div[1]/div[1]/div[1]/button[1]"
  //       )
  //     )
  //   );

  //   try {
  //     await driver.sleep(3000);
  //     await driver.findElement(
  //       By.xpath(
  //         "//label[contains(text(), 'Abrar-Test-List')]/ancestor::nz-form-label/following-sibling::nz-form-control//input"
  //       )
  //     );
  //   } catch {
  //     console.log('List picker with text "Abrar-Test-List" not found');
  //   }

  //   try {
  //     await driver.sleep(3000);
  //     await driver.findElement(
  //       By.xpath("//label[contains(text(), 'Abrar-Test-Date')]")
  //     );
  //   } catch {
  //     console.log('Label with text "Abrar-Test-Date" not found.');
  //   }
  // });
});
