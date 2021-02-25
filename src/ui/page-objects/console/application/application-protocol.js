/**
 * Copyright 2020 WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * This software is the property of WSO2 Inc. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content."
 */

//LOCATORS OIDC
const LNK_OIDC_PROTOCOL = "[data-testid=minimal-application-create-wizard-b9c5e11e-fc78-484b-9bec-015d247561b8-card"
+"-header]",
    TXT_OIDC_APP_NAME = "[data-testid=minimal-application-create-wizard-application-name-input]",
    TXT_OIDC_REDIRECT_URL = "[data-testid=minimal-application-create-wizard-oauth-protocol-settings-form-callback-url-"
    +"input]",
    BTN_OIDC_ADD_REDIRECT_URL = "[data-testid=minimal-application-create-wizard-oauth-protocol-settings-form-callback-"
    +"url-input-add-button]",
    BTN_OIDC_REGISTER = "[data-testid=minimal-application-create-wizard-next-button]";

//LOCATORS SAML
const LNK_SAML_PROTOCOL = "[data-testid=\"minimal-application-create-wizard-"
      +"776a73da-fd8e-490b-84ff-93009f8ede85-card-header\"]",
    TXT_SAML_APP_NAME = "[data-testid=\"minimal-application-"
      +"create-wizard-application-name-input\"]",
    TXT_SAML_WEB_APP_ISSUER = "[data-testid=\"minimal-application-create-wizard-"
      +"saml-protocol-settings-form-issuer-input\"]",
    TXT_SAML_WEB_APP_ACURLS = "[data-testid=\"minimal-application-create-wizard-"
      +"saml-protocol-settings-form-assertion-consumer-url-input\"]",
    BTN_SAML_ACURL_ADD = "[data-testid=\"minimal-application-create-wizard-"
      +"saml-protocol-settings-form-assertion-consumer-url-input-add-button\"]",
    LBL_ACURL = "[data-testid=\"minimal-application-create-wizard-saml-protocol-settings-form-"
      +"assertion-consumer-url-input-";

//LOCATORS SINGLE PAGE APPLICATION
const TXT_SINGLE_APP_NAME = "[data-testid=minimal-application-create-wizard-application-name-input]",
    TXT_SINGLE_APP_REDIRECT_URL = "[data-testid=minimal-application-create-wizard-oauth-protocol-settings-form-"
      +"callback-url-input]",
    BTN_SINGLE_APP_ADD_REDIRECT_URL = "[data-testid=minimal-application-create-wizard-oauth-protocol-settings-form-"
      +"callback-url-input-add-button]",
    BTN_SINGLE_APP_REGISTER = "[data-testid=minimal-application-create-wizard-next-button]";

class applicationProtocol {

    /**
     * Select application protocol OIDC
     * @param  {} protocol
     */
    static selectApplicationProtocol(protocol) {
        if(protocol=="oidc")
            cy.get(LNK_OIDC_PROTOCOL)
                .should('be.visible')
                .wait(500)
                .contains("OpenID Connect").then(($webapp) => {
                    cy.wrap($webapp).click({ delay: 70 });
                });
        if(protocol=="saml"){
            cy.get( LNK_SAML_PROTOCOL)
                .should('be.visible')
                .wait(500)
                .contains("SAML").then(($webapp) => {
                    cy.wrap($webapp).click({ delay: 70 });
                });
        }
    }

    /**
     * Add app name
     * @param  {} name
     */
    static addAppNameOIDC(name){
        cy.get(TXT_OIDC_APP_NAME).within(() =>{
            cy.get("input").clear().type(name);
        });
    }

    /**
     * Add redirect url
     * @param  {} redirectUrl
     */
    static addRedirectURLsOIDC(redirectUrl){
        cy.get(TXT_OIDC_REDIRECT_URL).within(()=>{
            cy.get("input").clear().type(redirectUrl);
        });
        cy.get(BTN_OIDC_ADD_REDIRECT_URL).click();
        
    }

    /**
     * Click Register button
     */
    static clickRegisterBtn(){
        cy.get(BTN_OIDC_REGISTER).click();
    }

    /**
     * This method is used to provide name for application.
     * @param {*} appName application name.
     */
    static provideAppNameSAML(appName) {

        cy.get(TXT_SAML_APP_NAME).should("be.visible").wait(500).within(() => {
            cy.get("input[name=\"name\"]")
                .should("be.visible")
                .clear().then(($name) => {
                    cy.wrap($name).type(appName)
                        .should("have.attr", "placeholder", "Enter a name for the application.")
                        .and("have.attr", "required")
                        .wrap($name).invoke('val').should('eq', appName);
                });
        });
    }

    /**
     * This method is used to provide issuer for application.
     * @param {*} issuer  SAML application issuer.
     */
    static provideAppIssuerSAML(issuer) {

        cy.get(TXT_SAML_WEB_APP_ISSUER).should("be.visible").wait(500).within(() => {
            cy.get("input[name=\"issuer\"]").should("be.visible").clear().then(($issuer) => {
                cy.wrap($issuer)
                    .type(issuer)
                    .should("have.attr", "placeholder", "Enter the issuer name")
                    .and("have.attr", "required")
                    .wrap($issuer).invoke('val').should('eq', issuer);
            });
        });
    }

    /**
     * This method is used to provide Assertion consumer URLs for application.
     * @param {*} url  Assertion consumer URL.
     */
    static provideACUrlsSAML(url) {

        cy.get(TXT_SAML_WEB_APP_ACURLS).should("be.visible").wait(500).within(() => {
            cy.get("input").should("be.visible").clear().then(($acurl) => {
                cy.wrap($acurl)
                    .type(url)
                    .should("have.attr", "placeholder", "Enter Assertion URL")
                    .wrap($acurl).invoke('val').should('eq', url);
            });
        });
    }

    /**
     * This method is used to add provided Assertion consumer URLs for application.
     * @param {*} acsUrl  Assertion consumer URL.
     */
    static addACUrlsSAML(acsUrl) {

        cy.get(BTN_SAML_ACURL_ADD).should("be.visible").wait(500).then(($addacurl) => {
            cy.wrap($addacurl).click({delay:70})
                .wait(2500)
                .get(LBL_ACURL+ acsUrl + '"]').invoke('text').then((text) => {
                    expect(text.trim()).equal(acsUrl) 
                });
        });
    }

    /**
     * Add Single Page Application Name
     * @param  {} name
     */
    static addSinglePageAppName(name){

        cy.get(TXT_SINGLE_APP_NAME).within(() =>{
            cy.get("input").clear().type(name);
        });
    }

    /**
     * Add Single Page Application redirect url
     * @param  {} redirectUrl
     */
    static addRedirectURLsSinglePageApp(redirectUrl){

        cy.get(TXT_SINGLE_APP_REDIRECT_URL).within(()=>{
            cy.get("input").clear().type(redirectUrl);
        });
        cy.get(BTN_SINGLE_APP_ADD_REDIRECT_URL).click();   
    }

    /**
     * Click Single Page Application Register button
     */
    static clickSinglePageApplicationRegisterBtn(){
        
        cy.get(BTN_SINGLE_APP_REGISTER).click();
    }
}
export default applicationProtocol;