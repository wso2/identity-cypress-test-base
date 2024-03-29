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

declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to select DOM element by `data-testid` attribute.
         * @example cy.dataTestId("admin-portal-switch")
         * @deprecated Deprecated since version 0.2.5. Use `cy.dataComponentId()` instead.
         */
        dataTestId(value: string, options?: Partial<Cypress.Loggable & Cypress.Timeoutable
            & Cypress.Withinable & Cypress.Shadow>): Chainable<Element>;

        /**
         * Custom command to select DOM element by `data-componentid` attribute.
         * @example cy.dataTestId("admin-portal-switch")
         */
        dataComponentId(value: string, options?: Partial<Cypress.Loggable & Cypress.Timeoutable
            & Cypress.Withinable & Cypress.Shadow>): Chainable<Element>;

        /**
         * Custom command to log users to portals.
         */
        login(username: string, password: string, serverURL: string, portal: string,
              tenantDomain?: string, waitTime?: number): Cypress.CanReturnChainable;

        /**
         * Custom command to log users out from portals.
         */
        logout(waitTime?: number): Cypress.CanReturnChainable;

        /**
         * Custom command to navigate to the user management section.
         */
        navigateToUserManagement(switchPortalTab?: boolean): Cypress.CanReturnChainable;
    }
}
