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
 * This command use to get the Authentication method with the prefered token and grant type
 * @example cy.scimCreateUser("https://<hostname>/domain/", "admin", "admin123",reqBody, true)
 * @param  {string} serverHost - Host name
 * @param  {string} username - API authetication username/client-ID
 * @param  {string} password - API authetication credentials password/client-secret
 * @param  {jsonbody} grantType - Prefeered grant type
 * @param  {boolean} authType - Prefeered authentication type
 * 
 * Ex:
 * if using the Basic Authentication ,
 * cy.getAuthorization("https://localhost:9443/t/carbon.super","admin","admin","","Basic" )
 * 
 * if using Bearer Authentication
 * cy.getAuthorization("https://localhost:9443/t/carbon.super","admin","admin","client_credentails","Bearer" )
 */
Cypress.Commands.add("getBasicAuthentication", (username: string, password: string) => {

    const encodedCredentials = btoa(username + ":" + password);

    return cy.wrap(`Basic ${encodedCredentials}`);

});

Cypress.Commands.add("getBearerAuthentication", (token: string) => {


    return cy.wrap(`Bearer ${token}`);

});

Cypress.Commands.add("getTokenViaClientCredential", (serverHost: string, clientID: string, clientSecret: string) => {

    const encodedCredentials = btoa(clientID + ":" + clientSecret);
    // Retrieve a bearer token from Bearer auth type `oauth2/token` endpoint.

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
