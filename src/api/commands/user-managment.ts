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

import { UserManagmentConstants } from "../constants/user-management-constants";
import { RequestContentTypes, RequestType }  from "../models/api-requests";

/**
 * This command use to create users from scim2.0 POST method
 * @example cy.scimCreateUser("https://<hostname>/domain/", "admin", "admin123",reqBody, true)
 * @param  {string} host - host
 * @param  {string} authrzUserName - API authetication credentials user name
 * @param  {string} authrzPassword - API authetication credentials passowrd
 * @param  {jsonbody} reqBody - request body with user profile informations
 * @param  {boolean} failOnStatusCode- Whether to fail on response codes other than 2xx and 3xx
 * */
Cypress.Commands.add("createUserViaAPI", (host: string ,authzHeader: string, reqBody: Cypress.ObjectLike,
     failOnStatusCode = true ) => {

        return cy.request({
            "method": RequestType.POST,
            "url": host + UserManagmentConstants.SCIM2_ENDPOINT + UserManagmentConstants.SCIM2_USER_ENDPOINT,
            "failOnStatusCode": failOnStatusCode,
            "headers": {
                "Content-Type": RequestContentTypes.SCIMJSON,
                "accept": RequestContentTypes.SCIMJSON,
                "Authorization": authzHeader
            },
            "body": reqBody
        });
   
});
