/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
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

import { ConsoleHeaderDomConstants, HeaderDomConstants } from "../../constants";

/**
 * Class containing Common Header component objects.
 */
export class Header {
  /**
   * Get the data attribute for user avatar.
   * @return {Cypress.Chainable<Element>}
   */
  public getUserAvatar(): Cypress.Chainable<Element> {
    return cy.dataTestId(HeaderDomConstants.AVATAR_ICON_DATA_ATTR);
  }

  /**
   * Get the data attribute for the logout button.
   * @return {Cypress.Chainable<Element>}
   */
  public getLogoutButton(): Cypress.Chainable<Element> {
    return cy.dataTestId(HeaderDomConstants.LOGOUT_BUTTON_DATA_ATTR);
  }

  /**
   * Click on the developer portal switch.
   * @deprecated since version 0.2.4. Use portal specific Header objects.
   */
  public clickOnDevelopPortalSwitch(): void {
    cy.dataTestId(ConsoleHeaderDomConstants.DEVELOP_SWITCH_DATA_ATTR).click();
  }

  /**
   * Click on the manage portal switch.
   * @deprecated since version 0.2.4. Use portal specific Header objects.
   */
  public clickOnManagePortalSwitch(): void {
    cy.dataTestId(ConsoleHeaderDomConstants.MANAGE_SWITCH_DATA_ATTR).click();
  }
}
