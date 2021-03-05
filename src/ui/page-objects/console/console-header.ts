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

import { ConsoleHeaderDomConstants } from "../../constants";
import { Header } from "../common";

/**
 * Class containing Console Header component objects.
 */
export class ConsoleHeader extends Header {

    /**
     * Click on the developer portal switch.
     * @param {Partial<ClickOptions>} options - Click options.
     */
    public clickOnDevelopPortalSwitch(options?: Partial<Cypress.ClickOptions>): void {
        cy.dataTestId(ConsoleHeaderDomConstants.DEVELOP_SWITCH_DATA_ATTR).click();
    }

    /**
     * Click on the manage portal switch.
     * @param {Partial<ClickOptions>} options - Click options.
     */
    public clickOnManagePortalSwitch(options?: Partial<Cypress.ClickOptions>): void {
        cy.dataTestId(ConsoleHeaderDomConstants.MANAGE_SWITCH_DATA_ATTR).click();
    }
}
