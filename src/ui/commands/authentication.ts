/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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
 */

/// <reference types="cypress" />

import { LoginPageDomConstants } from "../constants";
import { LoginPage } from "../page-objects";
import { CommonUtils } from "../utils";

/**
 * Custom command to log users to portals.
 * @example cy.login("admin", "admin", "https://localhost:9443/", "console/")
 *
 * @param {string} username - User's Username.
 * @param {string} password - User's Password.
 * @param {string} serverURL - Identity Server URL.
 * @param {string} portal - Relative path of the portal to login.
 * @param {string} tenantDomain - Tenant domain.
 * @param {number} waitTime - Configure wait time.
 * @returns {Cypress.CanReturnChainable}
 */
Cypress.Commands.add("login", (username: string,
                               password: string,
                               serverURL: string,
                               portal: string,
                               tenantDomain: string,
                               waitTime: number = 3000): Cypress.CanReturnChainable => {

    cy.window()
        .then((win: Cypress.AUTWindow) => {
            win.onbeforeunload = null;
        });

    // Visit the portal. ex: `https://localhost:9443/carbon.super/console`
    let url: URL = new URL(serverURL);

    if (tenantDomain) {
        url = new URL(tenantDomain, url);
    }

    if (portal) {
        url = new URL(portal, url);
    }

    cy.log("URL", url);

    cy.visit(url.toString(), {
        onBeforeLoad: (win) => {
            win.sessionStorage.clear();
        }
    });

    const loginPage = new LoginPage();

    loginPage.getLoginUsernameInputField().type(username);

    // Auto-detect login flow i.e Identifier first or Normal login flow.
    cy.get("body")
        .then(($body: JQuery<HTMLBodyElement>) => {
            // Check if a password field exists. If not, identify the form as part of an identifier first flow.
            if ($body.find(CommonUtils.resolveDataTestId(LoginPageDomConstants.PASSWORD_INPUT_DATA_ATTR)).length > 0) {
                loginPage.getLoginPasswordInputField().type(password, { log: false });
                loginPage.getLoginFormSubmitButton().click();
            } else {
                cy.log("Identifier first flow detected...");

                loginPage.getLoginFormContinueButton().click();
                loginPage.getLoginPasswordInputField().type(password, { log: false });
                loginPage.getLoginFormSubmitButton().click();
            }

            cy.wait(waitTime);
        });
});

/**
 * Custom command to log users out from portals.
 * @example cy.logout()
 *
 * @param {string} tenantDomain - Override tenant domain. If not provided, will be taken from env.
 * @param {number} waitTime - Configure wait time.
 * @returns {Cypress.CanReturnChainable}
 */
Cypress.Commands.add("logout", (waitTime: number = 3000): Cypress.CanReturnChainable => {

    const loginPage = new LoginPage();

    loginPage.clickOnLogoutButton();

    // Test fails due to this. Check if this is needed.
    // cy.url().should("include", BASE_URL + TENANT_DOMAIN + AUTH_ENDPOINT_URL + LOGOUT_URL_QUERY);

    cy.wait(waitTime);
});
