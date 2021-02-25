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
 * This method use to generate user data
 * Return, testdata
 * @param  {} "CreateUsersData"
 * @param  {} ScenarioNo
 * @param  {} noUsers
 */
Cypress.Commands.add("CreateUsersData",(ScenarioNo,noUsers) => {
 
    var testData = {};
    if (noUsers >0){
        testData.users = [];
        for (var i = 1; i <= noUsers; i++) {
         
            testData.users.push({});
            testData.users[i-1]["userName"] = "Testuser_"+ScenarioNo+"_"+i;
            testData.users[i-1]["password"] = "TestUserwso2_"+ScenarioNo+"_"+i;
            testData.users[i-1]["familyName"] = "TestUserFamilyname_"+ScenarioNo+"_"+i;
            testData.users[i-1]["givenName"] = "TestUserGivenname_"+ScenarioNo+"_"+i;
            testData.users[i-1]["primaryEmailValue"] = "TesterprimEmail_"+ScenarioNo+"_"+i;
            testData.users[i-1]["primaryEmailType"] = "home";
            testData.users[i-1]["secondaryEmailValue"] = "TestersecEmail_"+ScenarioNo+"_"+i;
            testData.users[i-1]["secondaryEmailType"] = "work";
            testData.users[i-1]["oraganization"] = "wso2";
            testData.users[i-1]["homePhoneNumber"] = "+94112233440";
            testData.users[i-1]["im"] = "TestIM";
            testData.users[i-1]["country"] = "Sri Lanka";
            testData.users[i-1]["mobileNumber"] = "94777000777";
        }            
        return  testData;
    } 
});

/**
 * This command use to create user from scim2.0 POST method and user body data is given by a fixture file 
 * Return, response
 * @param  {} "createUserWithGivenFixtureData"
 * @param  {} url
 * @param  {} authrzUserName
 * @param  {} authrzPassword
 * @param  {} fixturesFile
 */
Cypress.Commands.add("createUserWithScim2", (host,tenantEndPoint,authCredentials,grantType,reqBody,
    failOnStatusCode) => {
        if(grantType == "basicAuth"){

        return cy.request( {
            "method":"POST",
            "url":host+tenantEndPoint+Cypress.env("scimEndPoint")+Cypress.env("userEndPoint"),
            "failOnStatusCode":failOnStatusCode,
            "auth":{
                "username": authCredentials.userName,
                "password": authCredentials.password
            },
            "headers":{
                "Content-Type":"application/json"
            },
            "body":reqBody
        });
    }
    else if( grantType == "asg_api"){
        cy.getAccessTokenForTenantAdminRelatedActions(host,authCredentials.userName,authCredentials.password,
        failOnStatusCode).then(response =>{
        
            const token = response.body.access_token
            return cy.request ({
                "method":"POST",
                "url":host+tenantEndPoint+Cypress.env("scimEndPoint")+Cypress.env("userEndPoint"),
                "failOnStatusCode":failOnStatusCode,
                "headers":{
                    "Content-Type":"application/json",
                    "Authorization" : "Bearer "+token
                },
                "body":reqBody
            });
        });
    }
});

/**
 * This command use to create users from scim2.0 POST method
 * Return, response
 * @param  {} "createUser"
 * @param  {} url
 * @param  {} authrzUserName
 * @param  {} authrzPassword
 * @param  {} userInfor
 */
Cypress.Commands.add("createUser", ( url,authrzUserName,authrzPassword,userInfor,failOnStatusCode) => {

    return cy.request( {
        "method":"POST",
        "url":url,
        "failOnStatusCode":failOnStatusCode,
        "auth":{
            "username": authrzUserName,
            "password": authrzPassword
        },
        "headers":{
            "Content-Type":"application/json"
        },
        "body": {
            "schemas":[
         
            ],
            "name":{
                "familyName":userInfor.familyName,
                "givenName":userInfor.givenName
            },
            "userName":userInfor.userName,
            "password":userInfor.password,
            "emails":[
                {
                    "primary":true,
                    "value":userInfor.primaryEmailValue,
                    "type":userInfor.primaryEmailType
                },
                {
                    "value":userInfor.secondaryEmailValue,
                    "type":userInfor.secondaryEmailType
                }
            ]
        }
    });
});


/**
 * This command use to delete user from scim2.0 DELETE method
 * Return,response
 * @param  {} "deleteUser"
 * @param  {} url
 * @param  {} authrzUserName
 * @param  {} authrzPassword
 * @param  {} userId
 */
Cypress.Commands.add("deleteUser", ( host,tenantEndPoint,authCredentials,userId,grantType,failOnStatusCode) => {
 
    let url;
    
    if( grantType == "basicAuth"){
        return cy.request( {

            method: "DELETE",
            url: url+tenantEndPoint+Cypress.env("scimEndPoint")+Cypress.env("userEndPoint")+userId,
            failOnStatusCode: failOnStatusCode,

            "auth":{
                "username": authCredentials.userName,
                "password": authCredentials.password
            },

            "headers":{
                "Content-Type": "application/json"
            }   
        });
    } 
    else if( grantType == "asg_api"){

        cy.getAccessTokenForTenantAdminRelatedActions(host,authCredentials.userName,authCredentials.password,
        failOnStatusCode).then(response =>{
        
            const token = response.body.access_token
            return cy.request ({
                method: "DELETE",
                url: host+tenantEndPoint+Cypress.env("scimEndPoint")+Cypress.env("userEndPoint")+userId,
                failOnStatusCode: failOnStatusCode,
    
                "headers":{
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer "+token
                }   
            });
        });
    }
});
/**
 * This commad use to filter user from scim2.0 GET method
 * Return, response
 * @param  {} "filterUser"
 * @param  {} url
 * @param  {object} authCredentials
 * @param  {} paramters
 */
Cypress.Commands.add("filterUser", ( host,tenantEndPoint,authCredentials,paramters,grantType,failOnStatusCode) => {
    
    let url = host+tenantEndPoint+Cypress.env("scimEndPoint")+Cypress.env("userEndPoint");
    if ("id" in paramters) { 

        url = url+ paramters["id"].id + "?";
    } else {

        url=url.slice(0, -1) + "?";
    }
    for (var x in paramters) {

        if (x === "id") { continue; }
        var value = paramters[x];
        for (var y in value){      
            url=url +x+ "="+ value[y] + "&";
        }
    }

    url = url.slice(0, -1);
    cy.log(url);
    if( grantType == "basicAuth"){

        return cy.request ({
            method: "GET",
            url: url,
            failOnStatusCode: failOnStatusCode,
            "auth":{
                "username": authrzUserName,
                "password": authrzPassword
            },   
            "headers":{
                "Content-Type": "application/json"
            } 
        });
    }
    else if( grantType == "asg_api") {

        cy.getAccessTokenForTenantAdminRelatedActions(host,authCredentials.userName,authCredentials.password,
        failOnStatusCode).then(response => {
        
            const token = response.body.access_token
            return cy.request ({
                method: "GET",
                url: url,
                failOnStatusCode: failOnStatusCode,  
                "headers":{
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer "+token
                } 
            });
        });
    }
});

/**
 * This method use to get user by user ID from SCIM2.0 GET method
 * Return, response
 * @param  {} "getUserFromUserId"
 * @param  {} url
 * @param  {} aauthCredentials
 * @param  {} userId
 * @param  {} failOnStatusCode
 */
Cypress.Commands.add("getUserFromUserId", (url,authrzUserName,authrzPassword,userId,failOnStatusCode) => {

    return cy.request( {

        method: "GET",
        url: url+userId,
        failOnStatusCode: failOnStatusCode,
        "auth":{
            "username": authrzUserName,
            "password": authrzPassword
        },   
        "headers":{
            "Content-Type": "application/json"
        } 
    });
});

/**
 * This command update user from scim2.0 PATCH method
 * Return, resposne
 * @param  {} "patchUser"
 * @param  {} url
 * @param  {} authrzUserName
 * @param  {} authrzPassword
 * @param  {} operations
 * @param  {} userId
 * @param  {} failOnStatusCode
 */
Cypress.Commands.add("patchUser", (url,authrzUserName,authrzPassword,operations,userId,failOnStatusCode) => {

    var requestBody = "\"schemas\": [\"urn:ietf:params:scim:api:messages:2.0:PatchOp\"],"+ operations;
        
    requestBody =requestBody.slice(0,-1);
    requestBody = "{"+requestBody+"}";
    cy.log (requestBody); 

    return cy.request( {

        "method":"PATCH",
        "url":url+userId,
        "failOnStatusCode":failOnStatusCode,
        "auth":{
            "username": authrzUserName,
            "password": authrzPassword
        },
        "headers":{
            "Content-Type":"application/json"
        },
        "body":requestBody
    });
});

/**
 * This command use to update user from scim2.0 PUT method
 * Return, response
 * @param  {} "patchUser"
 * @param  {} url
 * @param  {} authrzUserName
 * @param  {} authrzPassword
 * @param  {} userInfor
 * @param  {} failOnStatusCode
 */
Cypress.Commands.add("patchUser", (url,authrzUserName,authrzPassword,userInfor,failOnStatusCode) => {

    return cy.request( {

        method: "PUT",
        url: url+userInfor.id,
        failOnStatusCode: failOnStatusCode,
        "auth":{
            "username": authrzUserName,
            "password": authrzPassword
        },   
        "headers":{
            "Content-Type": "application/json"
        } ,
        "body":{
            "schemas":[         
            ],
            "name":{
                "familyName":userInfor.familyName,
                "givenName":userInfor.givenName
            },
            "userName":userInfor.userName,
            "emails":[
                {
                    "primary":true,
                    "value":userInfor.primaryEmailValue,
                    "type":userInfor.primaryEmailType
                },
                {
                    "value":userInfor.secondaryEmailValue,
                    "type":userInfor.secondaryEmailType
                }
            ]
        }
    });
});

/**
 * This command use to update user from scim2.0 PUT method and user body data is given by a fixture file 
 * Return, response
 * @param  {} "patchUserWithGivenFixtureData"
 * @param  {} url
 * @param  {} authrzUserName
 * @param  {} authrzPassword
 * @param  {} failOnStatusCode
 * @param  {} fixturesFileData
 */
Cypress.Commands.add("patchUserWithGivenFixtureData", (url,authrzUserName,authrzPassword,userId,failOnStatusCode,
    fixturesFileData) => {

    cy.fixture(fixturesFileData).as("reqBody");
    cy.get("@reqBody").then(reqBody => {
        return cy.request( {

            method: "PUT",
            url: url+userId,
            failOnStatusCode: failOnStatusCode,
            "auth":{
                "username": authrzUserName,
                "password": authrzPassword
            },   
            "headers":{
                "Content-Type": "application/json"
            } ,
            "body":reqBody
        });
    });
});

/**
 * This command use to search user from sim2.0 POST method
 * Return, reponse
 * @param  {} "searchUser"
 * @param  {} (url
 * @param  {} authrzUserName
 * @param  {} authrzPassword
 * @param  {} searchParam
 * @param  {} failOnStatusCode
 */
Cypress.Commands.add("searchUser", (url,authrzUserName,authrzPassword,searchParam,failOnStatusCode) => {

    var requestBody = "\"schemas\": [\"urn:ietf:params:scim:api:messages:2.0:SearchRequest\"],";
    for (var x in searchParam) {

        var value = searchParam[x];
        for (var y in value){    
            requestBody=requestBody +x+ ":"+ value[y] + ",";
        }
    }
    requestBody =requestBody.slice(0,-1);
    requestBody = "{"+requestBody+"}";
    return cy.request( {
        "method":"POST",
        "url":url,
        "failOnStatusCode":failOnStatusCode,
        "auth":{
            "username": authrzUserName,
            "password": authrzPassword
        },
        "headers":{
            "Content-Type":"application/json"
        },
        "body":requestBody
    });
});

/**
 * This method is use to create users in bulk from scim2.0 POST method 
 * Return, response
 * @param  {} "createUserInBulk"
 * @param  {} url
 * @param  {} authrzUserName
 * @param  {} authrzPassword
 * @param  {} failCount
 * @param  {} failOnStatusCode
 * @param  {} userInfor
 */
Cypress.Commands.add("createUserInBulk",(url,authrzUserName,authrzPassword,failCount,failOnStatusCode,userInfor) => {

    //Generate operaions
    var operations="[";
    var operaStr;

    var keyCount= Object.keys(userInfor.users).length;
    var i=0;
    for (i = 0; i < keyCount; i++){
        cy.log(i) ;

        var userName =userInfor.users[i].userName;
        var password = userInfor.users[i].password;
        var familyName = userInfor.users[i].firstName;
        var givenName = userInfor.users[i].givenName;
        var primaryEmailValue=userInfor.users[i].primaryEmailValue;
        var primaryEmailType = userInfor.users[i].primaryEmailType;
        var secondaryEmailValue =userInfor.users[i].secondaryEmailValue;
        var secondaryEmailType = userInfor.users[i].secondaryEmailType;
        var homePhoneNumber = userInfor.users[i].homePhoneNumber;
        var mobileNumber = userInfor.users [i].mobileNumber;

        var  operationsBlock = {

            "method":"POST",
            "path":"/Users",
            "bulkId":"qwerty",
            "data":{
                "schemas":[
                    "   urn:ietf:params:scim:schemas:core:2.0:User"
                ],
                "userName":userName,
                "password":password,
                "name":{
                    "familyName": familyName,
                    "givenName":givenName
                },
                "emails":[
                    {
                        "primary":true,
                        "value":primaryEmailValue,
                        "type":primaryEmailType
                    },
                    {
                        "value":secondaryEmailValue,
                        "type":secondaryEmailType
                    } 
                ],
                "phoneNumbers":[
                    {
                        "primary":true,
                        "value":homePhoneNumber,
                        "type":"home"
                    },
                    {
                        "value":mobileNumber,
                        "type":"mobile"
                    }  
                ]
            }
        };

        operaStr=JSON.stringify(operationsBlock);
        operations = operations + operaStr + ",";
    }

    operations = operations.slice(0,-1);
    operations =  operations + "]";
    var operationsJsonObject = JSON.parse(operations);

    return cy.request( {
        "method": "POST",
        "url": url,
        "failOnStatusCode":failOnStatusCode,
        "auth": {
            "username": authrzUserName,
            "password": authrzPassword
        },
        "headers":{
            "Content-Type":"application/json"
        },
        "body":{
            "failOnErrors":failCount,
            "schemas":[
                "urn:ietf:params:scim:api:messages:2.0:BulkRequest"
            ],
            "Operations":operationsJsonObject
        }
    });    
});

/**
 * This method is use to create users in bulk from scim2.0 POST method user body data is given by a fixture file 
 * Return, response
 * @param  {} "createUserInBulkWithGivenFixctureData"
 * @param  {} url
 * @param  {} authrzUserName
 * @param  {} authrzPassword
 * @param  {} failOnStatusCode
 * @param  {} fixturesFile
 */
Cypress.Commands.add("createUserInBulkWithGivenFixctureData",(url,authrzUserName,authrzPassword,failOnStatusCode,
    fixturesFile) => {

    cy.fixture(fixturesFile).as("reqBody");
    cy.get("@reqBody").then(reqBody => {
        return cy.request( {
            "method": "POST",
            "url": url,
            "failOnStatusCode":failOnStatusCode,
            "auth": {
                "username": authrzUserName,
                "password": authrzPassword
            },
            "headers":{
                "Content-Type":"application/json"
            },
            "body":reqBody
        });    
    });
});

/**
 * This command use to delete users in bulk from scim2.0 DELETE method
 * Return, response
 * @param  {} "deleteUserInBulk"
 * @param  {} (url
 * @param  {} authrzUserName
 * @param  {} authrzPassword
 * @param  {} failOnStatusCode
 * @param  {} userIds
 * @param  {} failCount
 */
Cypress.Commands.add("deleteUserInBulk",(url,authrzUserName,authrzPassword,failOnStatusCode,userIds,failCount) => {
    
    //Generate operaions
    var operations="[";
    var operaStr;

    var keyCount= Object.keys(userIds).length;
    var i=0;
    for (i = 0; i < keyCount; i++){
        var userId =userIds[i];
        var  operationsBlock = {
            "path":"/Users/"+userId,
            "method":"DELETE"
        };
        operaStr=JSON.stringify(operationsBlock);
        operations = operations + operaStr + ",";
    }

    operations = operations.slice(0,-1);
    operations =  operations + "]";
    var operationsJsonObject = JSON.parse(operations);
    return cy.request( {

        "method": "POST",
        "url": url,
        "failOnStatusCode":failOnStatusCode,
        "auth": {
            "username": authrzUserName,
            "password": authrzPassword
        },
        "headers":{
            "Content-Type":"application/json"
        },
        "body":{
            
            "failOnErrors":failCount,
            "schemas":[
                "urn:scim:schemas:core:1.0"
            ],
            "Operations":operationsJsonObject
        }
    });
});

