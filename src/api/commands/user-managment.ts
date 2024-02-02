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

import { RequestContentTypes, RequestMethodTypes }  from "../constants/api-constants";
import { UserManagmentConstants } from "../constants/user-management-constants";

/**
 * This command use to create users from scim2.0 POST method
 * @example cy.scimCreateUser("https://<hostname>/domain/", "admin", "admin123",reqBody, true)
 * @param  {string} host - host
 * @param  {string} authrzUserName - API authetication credentials user name
 * @param  {string} authrzPassword - API authetication credentials passowrd
 * @param  {jsonbody} reqBody - request body with user profile informations
 * @param  {boolean} failOnStatusCode- Whether to fail on response codes other than 2xx and 3xx
 * */
Cypress.Commands.add("createUserViaAPI", (host, username, password, reqBody, grantType, authType,
    failOnStatusCode = true): Cypress.Chainable<any> => {

    cy.getAuthentication(host, username,
        password, grantType, authType).then(response => {
            
            const token = response.body.access_token;

            return cy.request({
                "method": RequestMethodTypes.POST,
                "url": host + UserManagmentConstants.SCIM2_ENDPOINT + UserManagmentConstants.SCIM2_USER_ENDPOINT,
                "failOnStatusCode": failOnStatusCode,
                "auth": {
                    token
                },
                "headers": {
                    "Content-Type": RequestContentTypes.URLENCODED
                },
                "body": reqBody
            });
        });
});
