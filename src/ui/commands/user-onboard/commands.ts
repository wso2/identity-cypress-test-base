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
 */

/// <reference types="cypress" />

import { ConsoleHeader, ConsoleSidePanel } from "../../page-objects";

/**
 * Custom command to navigate to the user management section.
 * @example cy.navigateToUserManagement()
 *
 * @param {boolean} switchPortalTab - If needed to switch to manage portal.
 * @returns {Cypress.CanReturnChainable}
 */
Cypress.Commands.add("navigateToUserManagement", (switchPortalTab: boolean = true): Cypress.CanReturnChainable => {

    if (switchPortalTab) {
        const header: ConsoleHeader = new ConsoleHeader();
        header.clickOnManagePortalSwitch();
    }

    const sidePanel: ConsoleSidePanel = new ConsoleSidePanel();

    sidePanel.navigateToUsers();
});
