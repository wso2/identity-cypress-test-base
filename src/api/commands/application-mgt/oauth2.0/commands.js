/**
 * Copyright 2021 WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * This software is the property of WSO2 Inc. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content."
 */
/// <reference types="cypress" />


/**
 * This command use to get application token from REST API
 * @example cy.getAccessToken(host,clientId,clientSecret,regBody)
 * @param  {sting} host - Application host
 * @param  {sring} clientId - Application client ID
 * @param  {string} clientSecret - Application secreat
 * @param  {string} regBody - Request body
 * @param  {boolean} failOnStatusCode - Whether to fail on response codes other than 2xx and 3xx
 */
Cypress.Commands.add("getAccessToken",(host,clientId,clientSecret,regBody)=>{
    return cy.request({

        url: host+ "oauth2/token",
        method: 'POST',
        auth: {
            'username': clientId,
            'password': clientSecret,
        },
        headers:
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        body: regBody
    });
})