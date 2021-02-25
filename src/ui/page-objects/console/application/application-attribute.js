/**
 * Copyright 2021 WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * This software is the property of WSO2 Inc. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content."
 */

const TAB_USER_ATTRIBUTE = "[data-testid=application-edit-resource-tabs]",
    LBL_USER_ATTRIBUTE = "[data-testid=minimal-application-create-wizard-next-button]";

class applicationAttributes {

    /**
     * Add application User Attributes
     * @param  {} testData
     */
    static selectApplicationUserAttribute() {
        cy.get(TAB_USER_ATTRIBUTE).click();

    }
}

export default applicationAttributes;