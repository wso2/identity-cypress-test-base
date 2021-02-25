/**
 * Copyright 2021 WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * This software is the property of WSO2 Inc. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content."
 */
/// <reference types="cypress" />

let LOCAL_STORAGE_MEMORY = {};

/**
 *  This method will generate access token for google API
 * @param  {string} clientID - Gmail client ID
 * @param  {string} clientSecret - Gmail client secreat
 * @param  {string} refreshToken - Gmail refresh token
 */
Cypress.Commands.add("getAccessTokenFromRefreshTokenGoogle",(clientID,clientSecret,refreshToken)=>{

    return cy.request( {
        "method": "POST",
        "url": "https://accounts.google.com/o/oauth2/token",
        "body" :{
            "client_id" : clientID,
            "client_secret" : clientSecret,
            "refresh_token" : refreshToken,
            "grant_type" : "refresh_token" 
        }
    });
});

/**
 * This method will list emails from google API
 * @param  {string} userId - gmail address
 * @param  {string} token - gamil access token
 */
Cypress.Commands.add("listMessagesInGoogleAccount",(userId,token)=>{

    return cy.request( {
        "method": "GET",
        "url": "https://gmail.googleapis.com/gmail/v1/users/"+userId+"/messages",
        "headers" :{
            "Authorization" : "Bearer "+ token
        }
    });
});

/**
 * This method will give email content from gmail API
 * @param  {string} userId - Gmail address
 * @param  {string} msgId - message ID
 * @param  {string} token - Gmail access token
 */
Cypress.Commands.add("getGmail", (userId,msgId,token)=>{
    return cy.request({
        "method": "GET",
        "url": "https://gmail.googleapis.com/gmail/v1/users/"+userId+"/messages/"+msgId,
        "headers" :{
            "Authorization" : "Bearer "+ token
        }
    });
});

/**
 * This method will retrive last email content
 * @param  {string} userId - Gamil username
 * @param  {string} clientID - Gmail cliet ID
 * @param  {string} clientSecret - Gmail client secret
 * @param  {string} refreshToken - Gmail refresh token
 */
Cypress.Commands.add("getLastGmail",(userId,clientID,clientSecret,refreshToken)=>{
 
    cy.getAccessTokenFromRefreshTokenGoogle(clientID,clientSecret,refreshToken).then((response) => {
        expect(response.status).to.eq(200);
        cy.writeFile("cypress/fixtures/token.json", response.body);
    });

    cy.fixture("token").as("token");
    cy.get("@token").then(token => {
    
        cy.listMessagesInGoogleAccount(userId,token.access_token).then((response) => {
            expect(response.status).to.eq(200);
            var lastEmailId = response.body.messages[0].id;

            cy.getGmail(userId,lastEmailId,token.access_token).then((response) => {
                expect(response.status).to.eq(200);

                //Convert base64 to string 
                var bodyencypted =response.body.payload.body.data;
                var bodyData=atob(bodyencypted.replace(/-/g, "+").replace(/_/g, "/"));
                var bodyDataString=bodyData.toString();
                return bodyDataString;
            });
        });
    });
});

/**
 * This method will base64 encode the given string
 * @param  {} "Base64Encoding"
 * @param  {} "string"
 */
Cypress.Commands.add("base64Encoding",(string)=>{
    var encodedString = btoa(string);
    console.log(encodedString); 
    return encodedString;
});