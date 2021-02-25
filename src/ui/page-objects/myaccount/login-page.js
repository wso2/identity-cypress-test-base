/**
 * Copyright 2020 WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * This software is the property of WSO2 Inc. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content."
 */

// Locators

const TXT_USER_NAME = "input#usernameUserInput";
const TXT_PASSWORD = "input#password"; 
const LNK_COOKIE_POLICY = "Cookie Policy";
const LNK_PRIVACY_POLICY = "Privacy Policy";
const BTN_CONTINUE = "Continue";
const BTN_CREATE_ACCOUNT = "Create Account";
const LNK_FORGOT_USER_NAME = "Username";
const LNK_FORGOT_PASSWORD = "Password";
const CHECKBOX_REMEMBER_ME = "input[type=\"checkbox\"]";
const TXT_ERROR_MSG="div[class=\"ui visible negative message\"]";
const BTN_SIGNIN = "[data-testid=login-page-continue-login-button]";


const PROJECT_TITLE_LOCATOR = "h1";

// Text values
const ERROR_MSG = "Login failed! Please recheck the username and password and try again.";
const PAGE_TITLE_COOKIE_POLICY = "WSO2 Identity Server - Cookie Policy";
const PAGE_TITLE_PRIVACY_POLICY ="WSO2 Identity Server - Privacy Policy";

// Methods to get locators
const txtUserName = () => cy.get(TXT_USER_NAME);
const txtPassword = () => cy.get (TXT_PASSWORD);
const lnkCookiePolicy = () => cy.contains(LNK_COOKIE_POLICY);
const lnkPrivacyPolicy = () => cy.contains(LNK_PRIVACY_POLICY);
const btnContinue = () => cy.contains(BTN_CONTINUE);
const btnSignin = () => cy.contains(BTN_SIGNIN);
const btnCreateAc = () => cy.contains(BTN_CREATE_ACCOUNT);
const lnkForgetUserName = () => cy.contains(LNK_FORGOT_USER_NAME);
const lnkForgetPassword = () => cy.contains(LNK_FORGOT_PASSWORD);
const checkBoxRememberMe = () => cy.get (CHECKBOX_REMEMBER_ME);
const txtUserInvalidErrorMsg = () => cy.get(TXT_ERROR_MSG).invoke("text").then((text) => {
    expect(text.trim()).equal(ERROR_MSG);
}) ;
const txtCookiePolicyPageTitle = () => cy.get(PROJECT_TITLE_LOCATOR).invoke("text").then((text) =>{
    expect(text.trim()).contains(PAGE_TITLE_COOKIE_POLICY);
});
const txtPrivacyPolicyPageTitle = () => cy.get(PROJECT_TITLE_LOCATOR).invoke("text").then((text) =>{
    expect(text.trim()).contains(PAGE_TITLE_PRIVACY_POLICY);
});

module.exports = {

    btnContinue,
    btnCreateAc,
    checkBoxRememberMe,
    lnkCookiePolicy,
    lnkForgetPassword,
    lnkForgetUserName,
    lnkPrivacyPolicy,
    txtCookiePolicyPageTitle,
    txtPassword,
    txtPrivacyPolicyPageTitle,
    txtUserInvalidErrorMsg,
    txtUserName,
    btnSignin
};