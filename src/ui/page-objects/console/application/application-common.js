/**
 * Copyright 2020 WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * This software is the property of WSO2 Inc. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content."
 */

const LOGIN_URL_CONTENT = "login",
    DEVELOP_PAGE_TAB = "a[class=\"active item portal-switch\"]",
    APPLICATION_PAGE_URL = "applications",
    SIDE_PANEL_APPLICATION = "[data-testid=\"side-panel-items-applications\"]",
    SIDE_PANEL_APPLICATION_LABEL = "[data-testid=\"side-panel-items-label\"]",
    NEW_APPLICATION_BUTTON = "[data-testid=\"primary-button\"]",
    NEW_APPLICATION_BUTTON_LABEL = "New Application",
    WEB_APPLICATION_QUICK_START = "[data-testid=\"web-application\"]",
    APPLICATION_WIZARD_HEADER = "div.modal-header",
    APPLICATION_REGISTER_BUTTON = "[data-testid=\"minimal-application-create-wizard-next-button\"]",
    LIST_APPLICATION_ITEMS = '[data-testid=applications-list]',
    NEW_SINGLE_APPLICATION_BUTTON_LABEL = "[data-testid=6a90e4b0-fbff-42d7-bfde-1efd98f07cd7-header]",
    APPLICATION_LIST_HEADER = "[data-testid=applications-list-item-heading]",
    APPLICATION_DELETE = "[data-testid=\"applications-list-item-delete-button\"]",
    DELETE_APPLICATION_INPUT = '[data-testid=applications-list-delete-'
        + 'confirmation-modal-assertion-input]',
    DELETE_APPLICATION_BUTTON = '[data-testid=applications-list-delete-'
        + 'confirmation-modal-confirm-button]';
//EDIT APPLICATION LOCATORS
const RESOURCE_TAB_DIV = "[data-testid=\"application-edit-resource-tabs\"]",
    EDIT_APP_NAME = "[data-testid=\"application-edit-general-"
        + "settings-form-application-name-input\"]",
    EDIT_APP_NAME_INPUT = "input[name=\"name\"]",
    EDIT_APP_HEADER = "[data-testid=\"application-edit-page-layout-page-header-header\"]",
    EDIT_APP_IMAGE_URL = "[data-testid=\"application-edit-general-settings-"
        + "form-application-image-url-input\"]",
    EDIT_APP_IMAGE_URL_INPUT = "input[name=\"imageUrl\"]",
    EDIT_APP_DISCOVERABLE_CHECKBOX = "[data-testid=\"application-edit-general-settings-"
        + "form-application-discoverable-checkbox\"]",
    EDIT_APP_DISCOVERABLE_CHECKBOX_INPUT = "input[name=\"discoverableByEndUsers\"]",
    EDIT_APP_ACCESS_URL = "[data-testid=\"application-edit-general-settings-"
        + "form-application-access-url-input\"]",
    EDIT_APP_ACCESS_URL_INPUT = "input[name=\"accessUrl\"]",
    UPDATE_APP_GENERAL_INFO_BUTTON = "[data-testid=\"application-edit-general-settings-form-submit-button\"]",
    REQUIRED_ACCESS_URL_ERROR_MSG_PARENT_DIV = "div[class=\"error.required.field\"]",
    REQUIRED_ACCESS_URL_ERROR_MSG_CHILD_DIV = "div[class=\"ui.pointing.above.prompt.label\"]",
    EDIT_BUTTON = "[data-testid=\"applications-list-item-edit-button\"]";
//EDIT CERTIFICATED END POINTS 
const EDIT_CERTIFICATE_RADIO_BUTTON = "[data-testid=\"application-edit-general-settings-"
    + "form-certificate-type-radio-group\"]",
    EDIT_JWKS_ENDPOINT = "[data-testid=\"application-edit-general-settings-form-jwks-input\"]",
    EDIT_JWKS_ENDPOINT_INPUT = "input[name=\"jwksValue\"]";

//APPLICATION LIST
const LIST_APP_RESOURCE_LIST = "[data-testid=applications-list]",
    LIST_APP_LIST_HEADER = "[data-testid=applications-list]",
    TXT_APP_LIST_DESCRIPTION = "[data-testid=applications-list-item-description]",
    LNK_APP_LIST_ACTIONS = "[data-testid=data-table-cell]";

/**
 * This class is manage Application page related UI functions.
*/
export default class ApplicationUIManagement {

    /**
     * This method is used to validate the URL of Develop page.
     * Method validate the if page navigate to Develop page.
     */
    static validateDevelopPageURL() {

        cy.url().then(url => {
            cy.url().should('contain', url);
            cy.wait(5000);
            cy.url().then(url => {
                if (url.includes(LOGIN_URL_CONTENT)) {
                    cy.reload()
                        .wait(500);
                }
            });
            cy.get(DEVELOP_PAGE_TAB).contains('Develop');
            cy.wait(3000);
        });
        this.clickSidePanelApplicationLink();
    }

    /**
     * This method is used to validate the Application link in SidePanel.
     */
    static clickSidePanelApplicationLink() {

        const currentURL = cy.url();
        cy.url().then(url => {
            if (!url.includes(APPLICATION_PAGE_URL)) {

                cy.get(SIDE_PANEL_APPLICATION).within(($link) => {
                    cy.get(SIDE_PANEL_APPLICATION_LABEL).then(($link) => {
                        cy.wrap($link).invoke('text').should('eq', 'Applications');
                        return false;
                    });
                    cy.wrap($link).click({ force: true })
                        .wait(3000)
                        .url().should('contain', APPLICATION_PAGE_URL)
                        .wait(7000);
                });
            } else {
                cy.url().should('contain', APPLICATION_PAGE_URL)
                    .wait(7000);
            }
        });
    }

    /**
     * This method is used to Click Add New Application Button.
     */
    static clickNewApplicationButton() {

        cy.get(NEW_APPLICATION_BUTTON).then(($button) => {
            cy.wait(7000)
                .wrap($button).invoke('text').should('eq', NEW_APPLICATION_BUTTON_LABEL)
                .wrap($button).click()
                .wait(3000);
        });
    }

    /**
     * This method is used to Select Application Type.
     */
    static selectWebApplication() {

        cy.get(WEB_APPLICATION_QUICK_START).then(($applicationType) => {
            cy.wrap($applicationType)
                .should('be.visible')
                .wait(500)
                .contains('Web Application')
                .click();
        });
    }

    /**
     * This method is used to Select Single Page Application Type.
     */
    static selectSingleApplication() {

        cy.get(NEW_SINGLE_APPLICATION_BUTTON_LABEL).then(($applicationType) => {
            cy.wrap($applicationType)
                .should("be.visible")
                .wait(500)
                .contains("Single-Page Application")
                .click();
        });
    }

    /**
     * This method is used to validate the Application Wizard header.
     * @param {*} visible header available
     */
    static validateApplicationWizardHeader(visible) {

        cy.get(APPLICATION_WIZARD_HEADER)
            .and("contain", "Web Application")
            .should(visible)
            .wait(500);
    }

    /**
     * This method is used to validate the Single Page Application Wizard header.
     * @param {*} visible header available
     */
    static validateSingleApplicationWizardHeader(visible) {

        cy.get(APPLICATION_WIZARD_HEADER)
            .and("contain", "Single-Page Application")
            .should(visible)
            .wait(500);
    }

    /**
     * This method is used to validate Application Registration.
     */
    static registerApplication() {

        cy.get(APPLICATION_REGISTER_BUTTON).should("be.visible").wait(500).then(($register) => {
            cy.wrap($register).click({ delay: 70 })
                .wait(3000)
                .get('div.modal-header')
                .should('not.be.visible');
        });
    }

    /**
     * This method is used to delete created Application.
     * @param {*} appName application name.
     */
    static deleteApplication(appName) {
        cy.get(LIST_APPLICATION_ITEMS).within(() => {
            cy.get(APPLICATION_DELETE).first().click();
        });

        cy.get('p').should(($p) => {
            // make sure the first contains application name
            expect($p.first()).to.contain(appName);
        })
        cy.get(DELETE_APPLICATION_INPUT).within(() => {
            cy.get('input').type(appName);
        });
        cy.get(DELETE_APPLICATION_BUTTON).click({ force: true });
    }

    /**
     * This method is used to navigate each tab in Application edit page.
     * @param {*} inputIndex Tab index.
     * @param {*} tab Tab name.
     */
    static navigateTab(inputIndex, inputTab) {

        // cy.reload();
        cy.wait(7000);
        cy.get(RESOURCE_TAB_DIV).children('div').within(() => {
            cy.get('a')
                .each(($el, $index) => {
                    if ($index == inputIndex) {
                        cy.wrap($el).prev().should('contain', inputTab);
                        return false;
                    }
                    cy.wrap($el).click();
                });
        });
    }

    /**
     * This method is used to validate Application Edit Page & Update Application Name.
     * @param {*} appName application name.
     */
    static updateApplicationName(appName) {

        this.validateApplicationHeader(appName);
        var updateApplicationName = "UpdateName";
        cy.get(EDIT_APP_NAME).within(() => {
            cy.get(EDIT_APP_NAME_INPUT).should("be.visible").then(($editName) => {
                cy.wrap($editName).invoke('val').should('eq', appName);
                cy.wrap($editName).clear()
                    .type(updateApplicationName)
                    .should("have.attr", "placeholder", "Enter a name for the application.")
                    .wrap($editName).invoke('val').should('eq', updateApplicationName);
            });
        });
    }

    static clickEditButton(appName) {

    }

    /**
     * This method is used to validate Application Edit Page & Update Application Description.
     * @param {*} appName application name.
     */
    static updateApplicationDescription(appName) {

        var updateApplicationName = "UpdateName";
        this.validateApplicationHeader(appName);
        cy.get(EDIT_APP_NAME).within(() => {
            cy.get(EDIT_APP_NAME_INPUT).should("be.visible").then(($editName) => {
                cy.wrap($editName)
                    .clear()
                    .type(updateApplicationName)
                    .should("have.attr", "placeholder", "Enter a name for the application.")
                    .wrap($editName).invoke('val').should('eq', updateApplicationName);
            });
        });

    }

    /**
     * This method is used to validate Application Edit Page & Update Application Image URI.
     * @param {*} appName application name.
     */
    static addApplicationImage(appName) {

        var updateImageUrl = "http://www.gravatar.com/avatar/00000000000000000000000000000000";
        this.validateApplicationHeader(appName);
        cy.get(EDIT_APP_IMAGE_URL).within(() => {
            cy.get(EDIT_APP_IMAGE_URL_INPUT).should("be.visible").clear().then(($imgUrl) => {
                cy.wrap($imgUrl)
                    .type(updateImageUrl)
                    .should("have.attr", "placeholder", "Enter a image url for the application")
                    .wrap($imgUrl).invoke('val').should('eq', updateImageUrl);
            });
        });
    }

    /**
     * This method is used to validate Application Header.
     * @param {*} appName application name.
     */
    static validateApplicationHeader(appName) {

        cy.get(EDIT_APP_HEADER).invoke('text')
            .should("contain", appName);
    }

    /**
     * This method is used to enable the application discoverable for end user.
     * @param {*} appName application name.
     */
    static enableDiscoverableApplication(appName) {

        this.validateApplicationHeader(appName);
        cy.get(EDIT_APP_DISCOVERABLE_CHECKBOX).within(() => {
            cy.get(EDIT_APP_DISCOVERABLE_CHECKBOX_INPUT).then(($inputCheck) => {
                cy.wrap($inputCheck).check({
                    force: true
                });
            })
                .should("be.checked");
        });
    }

    /**
     * This method is used to provide the application access url for end user.
     * @param {*} accessUrl Access url for end user.
     * @param {*} appName Application name.
     */
    static provideAccessUrl(accessUrl, appName) {

        this.validateApplicationHeader(appName);
        cy.get(EDIT_APP_ACCESS_URL).within(() => {
            cy.get(EDIT_APP_ACCESS_URL_INPUT).should("be.visible").clear().then(($accessUrl) => {
                cy.wrap($accessUrl)
                    .type(accessUrl)
                    .should("have.attr", "placeholder", "Enter access url for the application login page")
                    .wrap($accessUrl).invoke('val').should('eq', accessUrl);
            });
        });
    }

    /**
     * This method validate behaviour Access Url when enabled Discoverable.
     * Method validate error message when Access Url is required and update with empty.
     * @param {*} accessUrl Access Url.
     * @param {*} appName Application Name.
     */
    static validateAccessUrlWhenDiscoverableApp(accessUrl, appName) {

        this.enableDiscoverableApplication(appName);
        cy.get(EDIT_APP_ACCESS_URL_INPUT).should("be.visible").clear().then(($accessUrl) => {
            cy.wrap($accessUrl)
                .should("have.attr", "placeholder", "Enter access url for the application login page")
                .and("have.attr", "required");
        });
        this.updateGeneralInfo(appName);
        // validate error messages.
        cy.get(REQUIRED_ACCESS_URL_ERROR_MSG_PARENT_DIV).within(() => {
            cy.get(REQUIRED_ACCESS_URL_ERROR_MSG_CHILD_DIV).within(() => {
                cy.get("p").should("be.visible")
                    .invoke("text")
                    .should("contain", "A valid access URL needs to be defined for an application "
                        + "to be marked as discoverable");
            });
        });
    }

    /**
     * This method is used to update Application General Info.
     * @param {*} appName Application Name.
     */
    static updateGeneralInfo(appName) {

        this.enableDiscoverableApplication(appName);
        cy.get(UPDATE_APP_GENERAL_INFO_BUTTON).click({ delay: 70 });
    }

    /**
     * This method is used to check Certificate Type.
     * @param {*} appName application name.
     * @param {*} certType certificate Type
     */
    static checkJWKS_Endpoint(appName, certType) {

        this.enableDiscoverableApplication(appName);
        cy.get(EDIT_CERTIFICATE_RADIO_BUTTON).first().within(() => {
            cy.get('input')
                .should("be.visible")
                .check().then(($type) => {
                    cy.wrap($type).should("be.checked");
                });
        });
    }

    /**
     * This method is used to add Certificate details.
     * @param {*} appName application name.
     * @param {*} certValue certificate value.
     */
    static addJWKS_Endpoint(appName, certValue) {

        this.enableDiscoverableApplication(appName);
        cy.get(EDIT_JWKS_ENDPOINT).within(() => {
            cy.get(EDIT_JWKS_ENDPOINT_INPUT).should("be.visible").clear().then(($certValue) => {

                if (certValue === "JKS") {
                    cy.wrap($certValue)
                        .type(certValue)
                        .should("have.attr", "placeholder", "Application JWKS endpoint URL.")
                        .wrap($certValue).invoke('val').should('eq', certValue);
                }
                if (certValue === "PEM") {
                    cy.wrap($certValue)
                        .type(certValue)
                        .should("have.attr", "placeholder", "Certificate in PEM format.")
                        .wrap($certValue).invoke('val').should('eq', certValue);
                }
            });
        });
    }

    /**
     * List application
     * @param  {} tetsData
     * @param  {} flagApprExist
     */
    static getdetailFromAppList(testsData, flagApprExist) {

        if (flagApprExist == false) {
            //cy.get(LIST_APP_LIST_HEADER).should("not.exist",testsData.issuer);
            cy.get("div[class=\"content\"]").should("contain", testsData.issuer);
        } else {
            cy.get(LIST_APP_RESOURCE_LIST).within(() => {
                cy.get("div[class=\"content\"]").should("contain", testsData.issuer);
                // cy.get(LIST_APP_LIST_HEADER).should("contain",testsData.issuer);
                //cy.get(TXT_APP_LIST_DESCRIPTION).eq(0).should("not.be.oneOf",[null, ""]);
                cy.get("div[class=\"content\"]").find("div[class=\"sub header\"]").should("not.be.oneOf", [null, ""]);
                cy.get(LNK_APP_LIST_ACTIONS).eq(0).should("exist");
                cy.get(LNK_APP_LIST_ACTIONS).eq(1).should("exist");
            });
        }
    }

    /**
     * Click edit button
     * @param  {} issuer
     */
    static clickEditBtn(issuer) {

        // cy.get(LIST_APPLICATION_ITEMS).within(() => {
        //     cy.get(APPLICATION_LIST_HEADER).should('contain', issuer).nextUntil("div[class=\"list-item-action\"]");
        //     cy.get("div[class=\"list-item-action\"]").first().click();
        // });
        cy.get(LIST_APP_RESOURCE_LIST).within(() => {
            cy.get("div[class=\"content\"]").should("contain", issuer).nextUntil("div[class=\"list-item-action\"]");
            cy.get("i[class=\"grey pencil alternate small link icon list-icon\"]").click({ force: true });

            // cy.get(LNK_APP_LIST_ACTIONS).first().click();

        });
    }

    /**
     * Selected created application
     */
    static selectCreatedApplication() {
        cy.get(LIST_APP_RESOURCE_LIST).within(() => {
            cy.get(LNK_APP_LIST_ACTIONS).first().click();
        });
    }

    /**
     * This method is used to click application edit button
     */
    static clickApplicationEditButton() {
       
        cy.wait(7000);
        cy.get(EDIT_BUTTON).click({ force: true });
    }    
}