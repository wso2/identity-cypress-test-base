/**
 * Copyright 2020 WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * This software is the property of WSO2 Inc. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content."
 */

// Locators
const LBL_WELCOME_TXT = "[data-testid=page-layout-page-header-title]";
const IMG_USER = "div[class=\"wrapper\"]";
const TXT_USER_NAME = "div[class=\"username\"]";
const LNK_PAGE_MENU = "div[class=\"ui fluid vertical side-panel desktop menu\"]";
const LNK_PERSONAL_INFO = "Personal Info";
const LNK_SECURITY = "Security";
const LNK_OPERATIONS = "Operations";

// Text values
const WELCOME_TXT = "Welcome,";
const userName = "admin";

// Methods to get locators
// Methods to get locators
const txtWelcome = () => cy.get(LBL_WELCOME_TXT).invoke("text");


const imgUser = () => cy.get(IMG_USER).find("img").should("be.visible");

/**
const txtUserName = () => cy.get(TXT_USER_NAME).invoke("text").then((text) => {
    expect(text.trim()).eql(userName);
});
 */
const lnkPersonalInfo = () => cy.contains(LNK_PERSONAL_INFO);
const lnkSecurity = () => cy.contains(LNK_SECURITY);
const lnkOperations = () => cy.contains(LNK_OPERATIONS);

module.exports = {

    lnkOperations,
    lnkPersonalInfo,
    lnkSecurity,
    txtWelcome
};