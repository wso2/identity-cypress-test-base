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
        createUserViaAPI(host: string, authzHeader: string, reqBody: Cypress.ObjectLike, 
             failOnStatusCode?: boolean): Cypress.Chainable<any>;

        /**
        * This command use to get the Basic Authorization header
        * @param  {string} username - Username of the user.
        * @param  {string} password - Password of the user.
        */
        getBasicAuthorization(username: string, password: string): Cypress.Chainable<any>;

        /**
        * This command use to get the Bearer Authorization header,
        * @param  {string} token - A valid token retreived by any grant type.
        */
        getBearerAuthorization(token: string): Cypress.Chainable<any>;

        /**
        * This command use to get the Authentication token via a Client Credential grant type
        * @param  {string} serverHost - Server host endopoint
        * @param  {string} clientID - API authetication application client ID
        * @param  {string} clientSecret - API authetication application client Secret
        */
        getTokenViaClientCredential(serverHost: string, clientID: string, clientSecret: string): Cypress.Chainable<any>;
    }
}
