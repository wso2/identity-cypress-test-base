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
 * Abstract Class containing common listing page objects.
 */
export abstract class ListPage {

    /**
     * Get the table element.
     * @return {Cypress.Chainable<Element>}
     */
    public abstract getTable(): Cypress.Chainable<Element>;

    /**
     * Get the table body element.
     * @return {Cypress.Chainable<Element>}
     */
    public abstract getTableBody(): Cypress.Chainable<Element>;

    /**
     * Get the table first element.
     * @return {Cypress.Chainable<Element>}
     */
    public getTableFirstElement(): Cypress.Chainable<Element> {
        return this.getTable()
            .within(() => {
                cy.dataTestId("data-table-row")
                    .eq(0);
            });
    }

    /**
     * Click on the table first element's edit button.
     */
    public clickOnTableFirstElementEditButton(): void {
        this.getTableFirstElement()
            .within(() => {
                this.getTableItemEditButton().trigger("mouseover").click();
            });
    }

    /**
     * Click on the table first element's view button.
     */
    public clickOnTableFirstElementViewButton(): void {
        this.getTableFirstElement()
            .within(() => {
                this.getTableItemViewButton().trigger("mouseover").click();
            });
    }

    /**
     * Get the the table item heading.
     * @return {Cypress.Chainable<Element>}
     */
    public abstract getTableItemHeading(): Cypress.Chainable<Element>;

    /**
     * Get the the table item edit button.
     * @return {Cypress.Chainable<Element>}
     */
    public abstract getTableItemEditButton(): Cypress.Chainable<Element>;

    /**
     * Get the the table item delete button.
     * @return {Cypress.Chainable<Element>}
     */
    public abstract getTableItemViewButton(): Cypress.Chainable<Element>;

    /**
     * Get the page layout header element.
     * @return {Cypress.Chainable<Element>}
     */
    public abstract getPageLayoutHeader(): Cypress.Chainable<Element>;

    /**
     * Get the page layout header title element.
     * @return {Cypress.Chainable<Element>}
     */
    public abstract getPageLayoutHeaderTitle(): Cypress.Chainable<Element>;

    /**
     * Get the page layout header sub title element.
     * @return {Cypress.Chainable<Element>}
     */
    public abstract getPageLayoutHeaderSubTitle(): Cypress.Chainable<Element>;

    /**
     * Get the page layout header action element.
     * @return {Cypress.Chainable<Element>}
     */
    public abstract getPageLayoutHeaderAction(): Cypress.Chainable<Element>;

    /**
     * Get the list new placeholder element.
     * @return {Cypress.Chainable<Element>}
     */
    public abstract getNewTablePlaceholder(): Cypress.Chainable<Element>;

    /**
     * Get the list new placeholder action element.
     * @return {Cypress.Chainable<Element>}
     */
    public abstract getNewTablePlaceholderAction(): Cypress.Chainable<JQuery<HTMLButtonElement>>;

    /**
     * Click on the new button.
     * @param {Partial<ClickOptions>} options - Click options.
     */
    public clickOnNewButton(options?: Partial<Cypress.ClickOptions>): void {
        this.getPageLayoutHeaderAction().click(options);
    }
}
