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
 */

/// <reference types="cypress" />

import { Scim2Constants } from "../constants/scim2.0-constants";

/**
 * This command use to create users from scim2.0 POST method
 * @example cy.scimCreateUser("https://<hostname>/domain/", "admin", "admin123",reqBody, true)
 * @param  {string} host - host
 * @param  {string} authrzUserName - API authetication credentials user name
 * @param  {string} authrzPassword - API authetication credentials passowrd
 * @param  {jsonbody} reqBody - request body with user profile informations
 * @param  {boolean} failOnStatusCode- Whether to fail on response codes other than 2xx and 3xx
 * */
Cypress.Commands.add("createUserWithScim", ( host,authrzUserName,authrzPassword,reqBody,
    failOnStatusCode = true): Cypress.Chainable<any> => {

        return cy.request( {
        "method":"POST",
        "url":host+Scim2Constants.SCIM2_ENDPOINT+Scim2Constants.SCIM2_USER_ENDPOINT,
        "failOnStatusCode":failOnStatusCode,
        "auth":{
            "username": authrzUserName,
            "password": authrzPassword
        },
        "headers":{
            "Content-Type":"application/json"
        },
        "body": reqBody
    });
});
