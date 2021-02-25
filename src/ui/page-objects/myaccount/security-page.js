/**
 * Copyright 2020 WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * This software is the property of WSO2 Inc. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content."
 */

//Locators
const LBL_PAGE_HEADER = "h1[class=\"ui header page-header\"]";

//Text values
const SECURITY_PAGE_TITLE = "SecuritySecure your account by managing consents, sessions, and security settings";

//Methods to get locators
const hdrPage = () => cy.get(LBL_PAGE_HEADER).invoke("text").then((text) => {

    expect(text.trim()).equal(SECURITY_PAGE_TITLE);
});

module.exports = {

    hdrPage
};