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

/// <reference types="cypress" />

import { Header } from "./common";
import { LoginPageDomConstants } from "../constants";

/**
 * Class containing Login Page objects.
 */
export class LoginPage {
  public header: Header;

  /**
   * Generates a Login Page objects instance.
   * @constructor
   */
  constructor() {
    this.header = new Header();
  }

  /**
   * Get the data attribute for login page user input field.
   * @return {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  public static getLoginUsernameInputField(): Cypress.Chainable<Element> {
    return cy.dataTestId(LoginPageDomConstants.USERNAME_INPUT_DATA_ATTR);

    // return cy.get(data-testid=${ value }] options);

    // data-testid=${ value }]`;
  }

  /**
   * Get the data attribute for login page password input field.
   * @return {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  public getLoginPasswordInputField(): Cypress.Chainable<Element> {
    return cy.dataTestId(LoginPageDomConstants.PASSWORD_INPUT_DATA_ATTR);
  }

  /**
   * Get the data attribute for login page form submit button.
   * @return {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  public getLoginFormSubmitButton(): Cypress.Chainable<Element> {
    return cy.dataTestId(LoginPageDomConstants.SUBMIT_BUTTON_DATA_ATTR);
  }

  /**
   * Get the data attribute for login page Continue button.
   * @return {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  public getLoginFormContinueButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains(LoginPageDomConstants.CONTINUE_BUTTON_DATA_ATTR);
  }

  /**
   * Click on the Logout button on the header component.
   */
  public clickOnLogoutButton(): void {
    this.header.getUserAvatar().click();
    this.header.getLogoutButton().click();
  }
}
