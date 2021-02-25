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
 * This method is used to validate if element is present or not.
 * element is expect as an input.
 */
Cypress.Commands.add("checkIfEleExists", (ele) => {

    return new Promise((resolve,reject) => {
        cy.get("body").find( ele ).its("length").then(res => {
            if(res > 0){
                // do task to perform
                cy.get(ele).select("100").wait(2000);
                resolve();
            }else{
                reject();
            }
        });
    });
});

/**
 * This method is used to iterate through children elements.
 */
Cypress.Commands.add("recursiveEachChild", ($element) => {
  
    $element.children().each(function () {
        var $currentElement = $(this);
        // Loop children
        recursiveEach($currentElement);
    });
});

/**
 * This method is used to validate the URL is valid.
 */
Cypress.Commands.add("isUrlValid", (userInput) => {
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (pattern.test(userInput)) {
        return true;
    } 
    return false;
});


/**
 * To prevent the clearing of the local storage.
 */
Cypress.Commands.add("saveLocalStorageCache", () => {
    Object.keys(localStorage).forEach(key => {
        LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
});

/**
 * To prevent the clearing of the local storage.
 */
Cypress.Commands.add("restoreLocalStorageCache", () => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
});

/**
 * To clear the cache.
 */
Cypress.Commands.add("clearLocalStorageCache", () => {
    localStorage.clear();
    LOCAL_STORAGE_MEMORY = {};
});
