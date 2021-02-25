/**
 * Copyright 2020 WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * This software is the property of WSO2 Inc. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content."
 */

const OPERATION_PAGE_TITLE = "OperationsReview operational tasks that requires your approval";
const LBL_PAGE_HEADER = "h1[class=\"ui header page-header\"]";

const hdrPage = () => cy.get(LBL_PAGE_HEADER).invoke("text").then((text) => {

    expect(text.trim()).equal(OPERATION_PAGE_TITLE);
});

module.exports = {

    hdrPage
};