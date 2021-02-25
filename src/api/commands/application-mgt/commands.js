/**
 * Copyright 2020 WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * This software is the property of WSO2 Inc. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content."
 */
/// <reference types="cypress" />

/**
 * Get resident application form Application end point Rest API
 * @param  {string} host
 * @param  {string} tenantEndPoint
 * @param  {object} authCredentials
 * @param  {string} grantType
 * @param  {string} filter
 * @param  {string} failOnStatusCode
 */
Cypress.Commands.add("getResidentApplication",(host,tenantEndPoint,authCredentials,grantType,filter,failOnStatusCode)=>{

    if(grantType == "basicAuth"){
        return cy.request({

            "method": "GET",
            "url": host+tenantEndPoint+"api/server/v1/applications?"+filter,
            "failOnStatusCode":failOnStatusCode,
            "auth": {
                "username": authCredentials.userName,
                "password": authCredentials.userName
            },
            "headers":{
                "Content-Type":"application/json"
            }
        });
    } else if( grantType == "asg_api"){
        cy.getAccessTokenForTenantAdminRelatedActions(host,authCredentials.userName,authCredentials.password,
        failOnStatusCode).then(response =>{

            const token = response.body.access_token
            return cy.request({

                "method": "GET",
                "url": host+tenantEndPoint+"api/server/v1/applications?"+filter,
                "failOnStatusCode":failOnStatusCode,
                "headers":{
                "Content-Type":"application/json",
                "Authorization" : "Bearer "+token
                }
            });
        });
    }
});

/**
 * get inbound protocol OIDC from Inbound Protocols - OAuth / OIDC
 * @param  {} "getInboundProtocolsOIDC"
 * @param  {} (url
 * @param  {} authrzUserName
 * @param  {} authrzPassword
 * @param  {} failOnStatusCode
 */
Cypress.Commands.add("getInboundProtocolsOIDC",(appLocation,authrzUserName,authrzPassword,failOnStatusCode)=>{

    return cy.request( {

        "method": "GET",
        "url": appLocation+"/inbound-protocols/oidc",
        "failOnStatusCode":failOnStatusCode,
        "auth": {
            "username": authrzUserName,
            "password": authrzPassword
        },
        "headers":{
            "Content-Type":"application/json"
        }
    });
});

/**
 * This command use to delete application token from REST API
 * @example cy.deleteApplication(host,clientId,clientSecret,regBody)
 * @param  {string} host - host
 * @param  {string} appId - application Id
 * @param  {string} userName - Autherization User name 
 * @param  {string} password - Autherization Password
 * @param  {string} failOnStatusCode - Whether to fail on response codes other than 2xx and 3xx
 */
Cypress.Commands.add("deleteApplication",(host,tenantEndPoint,authCredentials,appId,grantType,failOnStatusCode)=>{
    
    if(grantType == "basi	cAuth"){
        return cy.request( {

            "method": "DELETE",
            "url": host+tenantEndPoint+"api/server/v1/applications/"+appId,
            "failOnStatusCode":failOnStatusCode,
            "auth": {
                "username": userName,
                "password": password
            },
            "headers":{
                "accept":"*/*"
            }
        });
    }
    else if( grantType == "asg_api"){
        cy.getAccessTokenForTenantAdminRelatedActions(host,authCredentials.userName,authCredentials.password,
        failOnStatusCode).then(response =>{
            
            const token = response.body.access_token;
            return cy.request( {

                "method": "DELETE",
                "url": host+tenantEndPoint+"api/server/v1/applications/"+appId,
                "failOnStatusCode":failOnStatusCode,
                "headers":{
                    "accept":"*/*",
                    "Authorization" : "Bearer "+token
                }
            });
        });
    }
});

/**
 * This command use to create application from REST api
 * @example cy.createApplicationWithRestAPI(applicationBody, true)
 * @param  {string} - host
 * @param  {string} authrzUserName - Autherization user name
 * @param  {string} authrzPassword - Autherization password name
 * @param  {json object} applicationBody - Application body
 * @param  {boolean} failOnStatusCode - Whether to fail on response codes other than 2xx and 3xx
 */
Cypress.Commands.add("createApplicationWithRestAPI",(host,authrzUserName,authrzPassword,applicationBody,failOnStatusCode)=>{
   
    return cy.request({
    
        "url":host+"api/server/v1/applications",
        "method": "POST",
        "failOnStatusCode" :failOnStatusCode,
        "auth":
            {
                'username': authrzUserName,
                'password': authrzPassword,
            },
        "headers":
            {
                'Content-Type': 'application/json'
            },
        "body": applicationBody
    })
})
