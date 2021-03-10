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
 *
 */

/// <reference types="cypress" />

/**
 * Class containing common utils.
 */
export class CommonUtils {

    /**
     * Private constructor to avoid object instantiation from outside
     * the class.
     *
     * @hideconstructor
     */
    private constructor() {}

    /**
     * Resolves the data test id when a raw attribute value is passed in.
     * @example CommonUtils.resolveDataTestId("sample-id") -> [data-testid="sample-id"]
     *
     * @param {string} value - Attribute value.
     * @returns {string}
     */
    public static resolveDataTestId(value: string): string {
        return `[data-testid=${ value }]`;
    }

    /**
     * Perform a click action on the given element.
     *
     * @example
     * CommonUtils.clickButton("sample-id")
     *
     * @example
     * const options: Partial<Cypress.ClickOptions> = { force:true }
     * CommonUtils.clickButton("sample-id", options)
     *
     * @param {string} dataTestId - Attribute data test id.
     * @param {Partial<Cypress.ClickOptions>} [options] - Options to be passed to the action.
     *
     * @see https://on.cypress.io/click click options.
     */
    public static clickElement(dataTestId: string, options?: Partial<Cypress.ClickOptions>): void {

        if (options) {
            cy.get(CommonUtils.resolveDataTestId(dataTestId)).click(options);
        } else {
            cy.get(CommonUtils.resolveDataTestId(dataTestId)).click();
        }
    }

    /**
     * Perform a forced click action on the given element.
     *
     * @example
     * CommonUtils.forceClickButton("sample-id")
     *
     * @param {string} dataTestId - Attribute data test id.
     */
    public static forceClickElement(dataTestId: string): void {

        const options: Partial<Cypress.ClickOptions> = { force: true };
        CommonUtils.clickElement(dataTestId, options);
    }

    /**
     * Perform a text input action on the given element.
     *
     * @example
     * CommonUtils.inputText("sample-id", "some text")
     *
     * @example
     * CommonUtils.inputText("sample-id", "{selectall}{backspace}some text")
     *
     * @example
     * const options: Partial<Cypress.TypeOptions> = { delay:2 }
     * CommonUtils.inputText("sample-id", "some text", options)
     *
     * @param {string} dataTestId - Attribute data test id.
     * @param {string} input - Text to input.
     * @param {Partial<Cypress.TypeOptions>} [options] - Options to be passed to the action.
     *
     * @see https://on.cypress.io/type type options.
     */
    public static inputText(dataTestId: string, input: string, options?: Partial<Cypress.TypeOptions>): void {

        if (options) {
            cy.get(CommonUtils.resolveDataTestId(dataTestId)).type(input, options);
        } else {
            cy.get(CommonUtils.resolveDataTestId(dataTestId)).type(input);
        }
    }

    /**
     * Perform a submit action on the given element.
     *
     * @example
     * CommonUtils.formSubmit("sample-id")
     *
     * @param {string} dataTestId - Attribute data test id.
     */
    public static formSubmit(dataTestId: string): void {

        cy.get(CommonUtils.resolveDataTestId(dataTestId)).submit();
    }
}
