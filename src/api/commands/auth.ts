/*
 *   Copyright (c) 2024 WSO2 Inc. (http://www.wso2.org)
 *   All rights reserved.
 *   
 *   This software is the property of WSO2 Inc. and its suppliers, if any.
 *   Dissemination of any information or reproduction of any material contained
 *   herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 *   You may not alter or remove any copyright or other notice from copies of this content.
 */

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
Cypress.Commands.add("getAuthentication", (serverHost: string, username: string, password: string,
    grantType: string, authType: "Basic" | "Bearer"): Cypress.CanReturnChainable => {
    const encodedCredentials = btoa(username + ":" + password);

    if (authType === "Basic") {
        return cy.wrap(encodedCredentials);
    }

    if (authType === "Bearer") {
        return cy.request({
            body: {
                "grant_type": grantType,
                "scope": "SYSTEM",
            },
            headers:
            {
                "Authorization": `Basic ${encodedCredentials}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            url: `${serverHost}/oauth2/token`
        });
    }

    throw new Error("Invalid Authentication type");
});
