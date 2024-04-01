/*
 *   Copyright (c) 2024 WSO2 Inc. (http://www.wso2.org)
 *   All rights reserved.
 *
 *   This software is the property of WSO2 Inc. and its suppliers, if any.
 *   Dissemination of any information or reproduction of any material contained
 *   herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 *   You may not alter or remove any copyright or other notice from copies of this content.
 */
/* eslint-disable header/header */
/* eslint-disable sort-keys */
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

import { RequestContentTypes, RequestType } from "../models/api-requests";
import { UserManagmentConstants } from "../models/user-management";

/**
 * This command use to create users from scim2.0 POST method
 * @param  {string} host - host
 * @param  {string} authzHeader - Authorization token
 * @param  {jsonbody} reqBody - Request body with user profile informations
 * @param  {boolean} failOnStatusCode - Whether to fail on response codes other than 2xx and 3xx
 * */
Cypress.Commands.add(
  "createUserViaAPI",
  (
    host: string,
    authzHeader: string,
    reqBody: Cypress.ObjectLike,
    failOnStatusCode: any = true,
  ) =>
    cy.request({
      method: RequestType.POST,
      url:
        host +
        UserManagmentConstants.SCIM2_END_POINT +
        UserManagmentConstants.SCIM2_USER_ENDPOINT,
      failOnStatusCode,
      headers: {
        "Content-Type": RequestContentTypes.SCIMJSON,
        accept: RequestContentTypes.SCIMJSON,
        Authorization: authzHeader,
      },
      body: reqBody,
    }),
);
