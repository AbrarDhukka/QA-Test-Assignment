const { Builder, By, until, Key } = require("selenium-webdriver");

describe("Verify Workspace setting and image upload/delete functionality", function () {
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

  // Positive scenarios
  it("Verify login and Workspace setting page functionality", async function () {
    // Locate the sign-in with Klarr button and click it
    const signInButton = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-sign-in/nz-spin/div/div[1]/div[2]/div/div/div[3]/div'
        )
      ),
      20000
    );
    await signInButton.click();

    // Enter login credentials
    await driver
      .findElement(By.id("email-field"))
      .sendKeys("deepa.nayak@gamma.klaar.team");
    await driver.findElement(By.id("password-field")).sendKeys("Klaar2021");

    // Click the login button
    await driver
      .findElement(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-sign-in/nz-spin/div/div[1]/div[2]/div/nz-spin/div/form/nz-form-item[2]/nz-form-control/div/div/nz-input-group/span'
        )
      )
      .click();
    await driver.findElement(By.id("login-btn")).click();
    console.log("Clicked on login");

    // Wait for a while to ensure successful login
    await driver.sleep(2000);

    // Navigate to Workspace settings
    const settingsButton = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-sider/div/div/div[1]/div[2]/ul/div[7]/button/li'
        )
      ),
      20000
    );
    await settingsButton.click();
    console.log("Clicked on settings");

    // Verify functionality and presence of the "Workspace" section
    await driver.sleep(3000);
    const workspaceHeaderText = await driver
      .findElement(By.xpath("//nz-page-header/div[1]/div[1]"))
      .getText();
    console.log("Workspace Header Text - ", workspaceHeaderText);
    if (workspaceHeaderText.includes("Workspace")) {
      console.log("Workspace is present");
    } else {
      console.log("Workspace is not present");
    }

    // Navigate to "Customize Modules" section
    await driver
      .findElement(By.xpath("//a[contains(text(),'Customize Modules')]"))
      .click();
    const customizeModulesHeaderText = await driver
      .findElement(By.xpath("//nz-page-header/div[1]/div[1]"))
      .getText();
    console.log("Customize Modules Header Text - ", customizeModulesHeaderText);
    if (customizeModulesHeaderText.includes("Customize Modules")) {
      console.log(
        "Customize Modules is present, and the page is working successfully"
      );
    } else {
      console.log("Customize Modules is not present");
    }

    // Navigate back to the "Workspace" section
    await driver
      .findElement(By.xpath("//a[contains(text(),'Workspace')]"))
      .click();
  });

  it("Verify user is able to upload workspace logo successfully", async function () {
    // Login steps
    const signInButton = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-sign-in/nz-spin/div/div[1]/div[2]/div/div/div[3]/div'
        )
      ),
      20000
    );
    await signInButton.click();
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
    await driver.sleep(2000);

    // Navigate to settings
    const settingsButton = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-sider/div/div/div[1]/div[2]/ul/div[7]/button/li'
        )
      ),
      20000
    );
    await settingsButton.click();
    console.log("Clicked on settings");

    // Scroll into view and upload workspace logo
    const chooseFileButton = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-settings/nz-spin/div/div/nz-card[3]/div/div/nz-spin/div/nz-upload/div/div/input'
        )
      ),
      90000
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView();",
      chooseFileButton
    );

    // Upload image
    await chooseFileButton.sendKeys(
      "C://Users//abrdh//OneDrive//Desktop//QA_Test_Assignment//QA_TEST_01//demo-face.png"
    );
    const saveButton = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-settings/nz-spin/div/div/nz-card[3]/div/div/nz-spin/div/div/div/button[1]'
        )
      ),
      90000
    );
    await driver.executeScript("arguments[0].scrollIntoView();", saveButton);
    const actions = driver.actions();
    await actions.move({ origin: saveButton }).click().perform();
    console.log("Image uploaded successfully");

    // Wait for save button to be stale
    await driver.wait(until.stalenessOf(saveButton), 90000);

    // Verify uploaded logo
    const sideLogo = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-sider/div/div/div[1]/div[1]/div/img'
        )
      ),
      90000
    );
    const uploadedLogo = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-settings/nz-spin/div/div/nz-card[3]/div/div/nz-spin/div/nz-upload/div/div/div/div[1]/img'
        )
      ),
      90000
    );
    const sideLogoSrc = await sideLogo.getAttribute("src");
    console.log("SideLogo - ", sideLogoSrc);
    const uploadedLogoSrc = await uploadedLogo.getAttribute("src");
    console.log("uploadLogo - ", uploadedLogoSrc);

    // Compare logo sources
    if (sideLogoSrc === uploadedLogoSrc) {
      console.log("Uploaded image is matching");
    } else {
      console.log("Uploaded image is not matching");
    }

    // Wait for save button to be stale again
    await driver.wait(until.stalenessOf(saveButton), 90000);
    await driver.sleep(2000);
  });

  it("Verify user is able to delete workspace logo successfully", async function () {
    // Login steps
    const signInButton = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-sign-in/nz-spin/div/div[1]/div[2]/div/div/div[3]/div'
        )
      ),
      20000
    );
    await signInButton.click();
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
    await driver.sleep(2000);

    // Navigate to settings
    const settingsButton = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-sider/div/div/div[1]/div[2]/ul/div[7]/button/li'
        )
      ),
      20000
    );
    await settingsButton.click();
    console.log("Clicked on settings");

    // Locate delete logo button
    const deleteLogo = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//body/div[@id='main-app']/app-root[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[1]/app-settings[1]/nz-spin[1]/div[1]/div[1]/nz-card[3]/div[1]/div[1]/nz-spin[1]/div[1]/nz-upload[1]/div[1]/div[1]/div[1]/button[1]"
        )
      ),
      90000
    );

    // Scroll into view
    await driver.executeScript("arguments[0].scrollIntoView();", deleteLogo);

    // Click delete logo button
    await driver.sleep(5000);
    await deleteLogo.click();
    console.log("Clicked delete circle logo successfully");

    // Locate confirm delete button
    const deletedLogo = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-settings/nz-spin/div/div/nz-card[3]/div/div/nz-spin/div/div/div/button[2]'
        )
      ),
      90000
    );

    // Click confirm delete button
    await deletedLogo.click();
    console.log("Image deleted successfully");

    // Verify default logo after deletion
    const defaultSideLogo = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-sider/div/div/div[1]/div[1]/div/img'
        )
      ),
      90000
    );
    const defaultSideLogoSrc = await defaultSideLogo.getAttribute("src");

    if (
      defaultSideLogoSrc ===
      "https://klaar-resources.s3.ap-south-1.amazonaws.com/KlaarLogoShort.png"
    ) {
      console.log(
        "Image deleted successfully, and I am able to see the default image."
      );
    }
  });

  // Negative scenarios
  it("Verify user is not able to login with invalid credentials", async function () {
    // Wait until the element is visible (adjust the timeout as needed)
    const signInButton = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-sign-in/nz-spin/div/div[1]/div[2]/div/div/div[3]/div'
        )
      ),
      20000
    );

    // Perform login with invalid credentials
    await signInButton.click();
    await driver.findElement(By.id("email-field")).sendKeys("xyz@gmail.com");
    await driver.findElement(By.id("password-field")).sendKeys("xyz123");
    await driver
      .findElement(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-sign-in/nz-spin/div/div[1]/div[2]/div/nz-spin/div/form/nz-form-item[2]/nz-form-control/div/div/nz-input-group/span'
        )
      )
      .click();
    await driver.findElement(By.id("login-btn")).click();
    console.log("Clicked on login");

    // Wait for a while to check for error message
    await driver.sleep(2000);

    // Check for the error message
    const failureMsg = await driver
      .findElement(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-sign-in/nz-spin/div/div[1]/div[2]/div/app-alerts/div'
        )
      )
      .getText();

    if (failureMsg.includes("Oops! Incorrect Email or Password")) {
      console.log("Got error message successfully - ", failureMsg);
    } else {
      console.log("Didn't get error message");
    }
  });

  it("Verify user is uploading logo without saving", async function () {
    // Login steps
    const signInButton = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-sign-in/nz-spin/div/div[1]/div[2]/div/div/div[3]/div'
        )
      ),
      20000
    );
    await signInButton.click();
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
    await driver.sleep(2000);

    // Navigate to settings
    const settingsButton = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-sider/div/div/div[1]/div[2]/ul/div[7]/button/li'
        )
      ),
      20000
    );
    await settingsButton.click();
    console.log("Clicked on settings");

    // Scroll into view and upload workspace logo
    const chooseFileButton = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-settings/nz-spin/div/div/nz-card[3]/div/div/nz-spin/div/nz-upload/div/div/input'
        )
      ),
      90000
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView();",
      chooseFileButton
    );

    // Upload image
    await chooseFileButton.sendKeys(
      "C://Users//abrdh//OneDrive//Desktop//QA_Test_Assignment//QA_TEST_01//demo-face.png"
    );
    const cancelButton = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-settings/nz-spin/div/div/nz-card[3]/div/div/nz-spin/div/div/div/button[2]'
        )
      ),
      90000
    );
    await driver.executeScript("arguments[0].scrollIntoView();", cancelButton);
    const actions = driver.actions();
    await actions.move({ origin: cancelButton }).click().perform();
    console.log("Image not uploaded");

    // Wait for cancel button to be stale
    await driver.wait(until.stalenessOf(cancelButton), 90000);

    // Verify default logo after cancellation
    const defaultSideLogo = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="main-app"]/app-root/app-layout/nz-layout/nz-sider/div/div/div[1]/div[1]/div/img'
        )
      ),
      90000
    );
    const defaultSideLogoSrc = await defaultSideLogo.getAttribute("src");

    if (
      defaultSideLogoSrc ===
      "https://klaar-resources.s3.ap-south-1.amazonaws.com/KlaarLogoShort.png"
    ) {
      console.log(
        "Logo upload cancelled successfully, and I am able to see the default image."
      );
    }
    
    await driver.sleep(2000);
  });
});
