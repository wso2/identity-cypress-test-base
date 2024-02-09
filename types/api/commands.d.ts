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
         * Custom command to create users from scim2.0 POST method
         */
        createUserViaAPI(host: String, username: string, password: string, reqBody: object, authType: "Basic" | "Bearer",
            failOnStatusCode?: boolean): Cypress.Chainable<any>;

        /** 
        * This command use to get the Authentication method with the prefered token and grant type
        * @example cy.scimCreateUser("https://<hostname>/domain/", "admin", "admin123", reqBody, true)
        * @param  {string} serverHost - Host name
        * @param  {string} username - API authetication username/client-ID
        * @param  {string} password - API authetication credentials password/client-secret
        * @param  {jsonbody} grantType - Prefeered grant type
        * @param  {boolean} authType - Prefeered authentication type
        * */
        getAuthentication(host: String, username: string, password: string, grantType: string,
             authType: "Basic" | "Bearer"): Cypress.Chainable<any>;
    }
}
