/*
 *   Copyright (c) 2024 WSO2 LLC. (http://www.wso2.org)
 *   All rights reserved.
 *   
 *   This software is the property of WSO2 Inc. and its suppliers, if any.
 *   Dissemination of any information or reproduction of any material contained
 *   herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 *   You may not alter or remove any copyright or other notice from copies of this content.
 */
import { RequestContentTypes }  from "../models/api-requests";

/**
 * This command use to get the Basic Authorization header
 * @param  {string} username - Username of the user.
 * @param  {string} password - Password of the user.
 */
Cypress.Commands.add("getBasicAuthorization", (username: string, password: string) => {

    const encodedCredentials = btoa(username + ":" + password);

    return cy.wrap(`Basic ${encodedCredentials}`);

});

/**
 * This command use to get the Bearer Authorization header,
 * @param  {string} token - A valid token retreived by any grant type.
 */
Cypress.Commands.add("getBearerAuthorization", (token: string) => {

    return cy.wrap(`Bearer ${token}`);

});

/**
 * This command use to get the Authentication token via a Client Credential grant type
 * @param  {string} serverHost - Server host endopoint
 * @param  {string} clientID - API authetication application client ID
 * @param  {string} clientSecret - API authetication application client Secret
 */
Cypress.Commands.add("getTokenViaClientCredential", (serverHost: string, clientID: string, clientSecret: string) => {

    const encodedCredentials = btoa(clientID + ":" + clientSecret);
    // Retrieve a token from Basic auth type via `oauth2/token` endpoint .

    return cy.request({
        body: {

            "grant_type": "client_credentials",
            "scope": "SYSTEM"
        },
        headers:
        {
            "Authorization": `Basic ${encodedCredentials}`,
            "Content-Type": RequestContentTypes.URLENCODED
        },
        method: "POST",
        url: `${serverHost}/oauth2/token`
    });
});
