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

/**
 * Abstract Class containing common create wizard objects.
 */
export abstract class CreateWizard {

    /**
     * Get the creation wizard.
     * @return {Cypress.Chainable<Element>}
     */
    public abstract getCreateWizard(): Cypress.Chainable<Element>;

    /**
     * Get the minimal creation wizard form submit button.
     * @return {Cypress.Chainable<Element>}
     */
    public abstract getCreateWizardSubmitButton(): Cypress.Chainable<Element>;

    /**
     * Get the creation wizard success alert.
     * @return {Cypress.Chainable<Element>}
     */
    public abstract getCreateWizardSuccessAlert(): Cypress.Chainable<Element>;

    /**
     * Get the creation wizard error alert.
     * @return {Cypress.Chainable<Element>}
     */
    public abstract getCreateWizardErrorAlert(): Cypress.Chainable<Element>;

    /**
     * Click on the creation wizard form submit button.
     * @param {Partial<ClickOptions>} options - Click options.
     */
    public clickOnCreateWizardSubmitButton(options?: Partial<Cypress.ClickOptions>): void {
        this.getCreateWizardSubmitButton().click(options);
    }
}
