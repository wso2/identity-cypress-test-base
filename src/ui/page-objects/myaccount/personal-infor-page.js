/**
 * Copyright 2020 WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * This software is the property of WSO2 Inc. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content."
 */

const PERSONAL_INFO_PAGE_TITLE = "Personal InfoEdit or export your personal profile and manage linked accounts";
const LBL_PAGE_HEADER = "h1[class=\"ui header page-header\"]";
const TXT_FIRST_NAME = "input[placeholder=\"Enter your First name\"]";
const TXT_LAST_NAME = "iEnter your Last name";
const TXT_EMAIL = "Enter your Email";
const TXT_MOBILE = "Enter your Mobile number";
const BTN_SAVE = "Save";
const BTN_CANCEL = "Cancel";

const hdrPage = () => cy.get(LBL_PAGE_HEADER).invoke("text").then((text) => {
    expect(text.trim()).equal(PERSONAL_INFO_PAGE_TITLE);
});
// cy.get('div.sb-item-body').contains('Landfill and Waste').eq(0).click()

const txtFirstName = () => cy.contains(TXT_FIRST_NAME);
const txtLastName = () => cy.contains(TXT_LAST_NAME);
const txtEmail = () => cy.contains(TXT_EMAIL);
const txtMobile = () => cy.contains(TXT_MOBILE);
const btnSave = () => cy.contains(BTN_SAVE);
const btnCancel = () => cy.contains(BTN_CANCEL);

module.exports = {

    btnCancel,
    btnSave,
    hdrPage,
    txtEmail,
    txtFirstName,
    txtLastName,
    txtMobile
};