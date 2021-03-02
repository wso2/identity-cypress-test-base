/**
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

/// <reference types="cypress" />

import { ConsoleSidePanelDomConstants } from "../../constants";

/**
 * Class containing Console Side Panel component objects.
 */
export class ConsoleSidePanel {

    /**
     * Click on Applications feature from side panel.
     * @return {Cypress.Chainable<Element>}
     */
    public navigateToApplications(): Cypress.Chainable<Element> {
        return cy.dataTestId(ConsoleSidePanelDomConstants.APPLICATIONS_MENU_ITEM_DATA_ATTR).click();
    }

    /**
     * Click on IDP feature from side panel.
     * @return {Cypress.Chainable<Element>}
     */
    public navigateToIdentityProviders(): Cypress.Chainable<Element> {
        return cy.dataTestId(ConsoleSidePanelDomConstants.IDP_MENU_ITEM_DATA_ATTR).click();
    }

    /**
     * Click on Users feature from side panel.
     * @return {Cypress.Chainable<Element>}
     */
    public navigateToUsers(): Cypress.Chainable<Element> {
        return cy.dataTestId(ConsoleSidePanelDomConstants.USERS_MENU_ITEM_DATA_ATTR).click();
    }

    /**
     * Click on Groups feature from side panel.
     * @return {Cypress.Chainable<Element>}
     */
    public navigateToGroups(): Cypress.Chainable<Element> {
        return cy.dataTestId(ConsoleSidePanelDomConstants.GROUPS_MENU_ITEM_DATA_ATTR).click();
    }

    /**
     * Click on Roles feature from side panel.
     * @return {Cypress.Chainable<Element>}
     */
    public navigateToRoles(): Cypress.Chainable<Element> {
        return cy.dataTestId(ConsoleSidePanelDomConstants.ROLES_MENU_ITEM_DATA_ATTR).click();
    }

    /**
     * Click on Userstores feature from side panel.
     * @return {Cypress.Chainable<Element>}
     */
    public navigateToUserstores(): Cypress.Chainable<Element> {
        return cy.dataTestId(ConsoleSidePanelDomConstants.USERSTORES_MENU_ITEM_DATA_ATTR).click();
    }

    /**
     * Click on Certificates feature from side panel.
     * @return {Cypress.Chainable<Element>}
     */
    public navigateToCertificates(): Cypress.Chainable<Element> {
        return cy.dataTestId(ConsoleSidePanelDomConstants.CERTIFICATES_MENU_ITEM_DATA_ATTR).click();
    }

    /**
     * Click on Attributes feature from side panel.
     * @return {Cypress.Chainable<Element>}
     */
    public navigateToAttributes(): Cypress.Chainable<Element> {
        return cy.dataTestId(ConsoleSidePanelDomConstants.ATTRIBUTES_MENU_ITEM_DATA_ATTR).click();
    }

    /**
     * Click on Dialects feature from side panel.
     * @return {Cypress.Chainable<Element>}
     */
    public navigateToDialects(): Cypress.Chainable<Element> {
        return cy.dataTestId(ConsoleSidePanelDomConstants.DIALECTS_MENU_ITEM_DATA_ATTR).click();
    }

    /**
     * Click on OIDC Scopes feature from side panel.
     * @return {Cypress.Chainable<Element>}
     */
    public navigateToOIDCScopes(): Cypress.Chainable<Element> {
        return cy.dataTestId(ConsoleSidePanelDomConstants.OIDC_SCOPES_MENU_ITEM_DATA_ATTR).click();
    }

    /**
     * Click on Email Templates feature from side panel.
     * @return {Cypress.Chainable<Element>}
     */
    public navigateToEmailTemplates(): Cypress.Chainable<Element> {
        return cy.dataTestId(ConsoleSidePanelDomConstants.EMAIL_TEMPLATES_MENU_ITEM_DATA_ATTR).click();
    }

    /**
     * Click on Remote Fetch feature from side panel.
     * @return {Cypress.Chainable<Element>}
     */
    public navigateToRemoteFetch(): Cypress.Chainable<Element> {
        return cy.dataTestId(ConsoleSidePanelDomConstants.REMOTE_FETCH_MENU_ITEM_DATA_ATTR).click();
    }
}
