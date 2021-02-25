/**
 * Copyright 2021 WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * This software is the property of WSO2 Inc. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content."
 */

import managepage from "../console/manage-landing-page.js";

//Basic Details
const TXT_USER_NAME = "[data-testid=user-mgt-add-user-form-email-input]",
    TXT_USER_FIRST_NAME = "[data-testid=user-mgt-add-user-form-firstName-input]",
    TXT_USER_LAST_NAME = "[data-testid=user-mgt-add-user-form-lastName-input]",
    BTN_NEXT = "[data-testid=user-mgt-add-user-wizard-modal-next-button]",
    BTN_FINISH = "[data-testid=user-mgt-add-user-wizard-modal-finish-button]",
    NEW_USER_BUTTON = "[data-testid=asgardeo-users-add-user-button]",
    NEW_USER_BUTTON_LABEL = "New User",
    RADIO_BTN_INVITE_TO_SET_PASSWORD = "[data-testid=user-mgt-add-user-form-ask-password-option-radio-button]",
    RADIO_BTN_SET_TEMPORARY_PASSWORD = "[data-testid=user-mgt-add-user-form-create-password-option-radio-button]",
    TXT_NEW_PASSWORD = "[data-testid=user-mgt-add-user-form-newPassword-input]",
    TXT_CONFIRM_PASSWORD = "[data-testid=user-mgt-add-user-form-confirmPassword-input]",
    LIST_USERS = "[data-testid=user-mgt-user-list]",
    USER_DELETE = "i[class=\"grey trash alternate small link icon list-icon\"]",
    DELETE_USER_INPUT = "[data-testid=user-mgt-user-list-confirmation-modal-assertion-input]",
    DELETE_USER_BUTTON = "[data-testid=user-mgt-user-list-confirmation-modal-confirm-button]",
    IMAGE_AVATAR = "[data-testid=user-avatar]",
    TXT_AVATAR_INITIALS = "[data-testid=user-avatar-initials]",
    LBL_SUMMARY_PORFILE_HEADING = "[data-testid=heading]",
    LBL_SUMMARY_FIELD = "div[class=\"two column row summary-field\"]",
    LBL_PROFILE_DESRIPTION = "div[class=\"description\"]",
    LBL_SUMMARY_LABEL = "div[class=\"label\"]",
    LBL_SUMMARY_VALUE = "div[class=\"value url\"]",
    LNK_CONSUMER_USER_TYPE = "div[id=\"Consumer\"]";

class User {

    /**
     * This method is used to Create New User with details.
     * @param  {object} testData - user profile data
     */
    static createUser(testData) {
        cy.wait(5000);
        managepage.navigateToManageSection();
        managepage.navigateToUserPage();
        this.clickNewUserButton();
        this.selectUserType(testData.userType);
        this.addUserDetails(testData.userName, testData.firstName, testData.lastName);
        if(testData.setPasswordOption == "InviteUserToSetPassowrd"){
            this.clickInviteUserToSetPassowrd();
            cy.get(BTN_NEXT).click();
            this.createNewBussinessUserSummary(testData)
        } 
        else 
        {
            this.clickSelectNewPassword(testData.password);
            cy.get(BTN_NEXT).click();
            this.createNewBussinessUserSummary(testData)
        }
        cy.get(BTN_FINISH).click();
        //TODO: validate created user by listing from UI
        //TODO: Add group assigne step.
    }

    /**
     * This method is used to Add User Basic Details
     * @param  {String} userName - user name
     * @param  {String} firstName - user first name
     * @param  {String} lastName - user last name
     */
    static addUserDetails(userName, firstName, lastName) {

        cy.get(TXT_USER_NAME).within(() => {
            cy.get("input").clear().type(userName).invoke('val').then(val => {
                expect(val.trim()).eq(userName)
            });
        });
        cy.get(TXT_USER_FIRST_NAME).within(() => {
            cy.get("input").clear().type(firstName).invoke('val').then(val => {
                expect(val.trim()).eq(firstName)
            });
        });
        cy.get(TXT_USER_LAST_NAME).within(() => {
            cy.get("input").clear().type(lastName).invoke('val').then(val => {
                expect(val.trim()).eq(lastName)
            });
        });
    }

    /**
    * This method is used to Click New User Button.
    */
    static clickNewUserButton() {

        cy.get(NEW_USER_BUTTON).then(($button) => {
            cy.wait(7000)
                .wrap($button).invoke('text').should('eq', NEW_USER_BUTTON_LABEL)
                .wrap($button).click()
                .wait(3000);
        });
    }

    /**
     * This method is to select user type from Add user wizard
     * @param  {string} userType
     */
    static selectUserType(userType) {
        if (userType == "consumerUser"){
            cy.get(LNK_CONSUMER_USER_TYPE).click({force:true});
        }
        cy.get(BTN_NEXT).click();
    }

    /**
    * This method is used to select password options
    * @param  {string} password - user password
    */
    static clickSelectNewPassword(password) {

        cy.get(RADIO_BTN_SET_TEMPORARY_PASSWORD).then(($radioButton) => {
            cy.wrap($radioButton)
                .should('be.visible')
                .wait(500)
                .contains('Set a temporary password for the user')
                .click();
        });

        cy.get(TXT_NEW_PASSWORD).within(() => {
            cy.get("input").clear().type(password);
        });
    }

    /**
     * This method is used to select password options,Invite the user to set their own password
    */
    static clickInviteUserToSetPassowrd (){
        cy.get(RADIO_BTN_INVITE_TO_SET_PASSWORD).then(($radioButton) => {
            cy.wrap($radioButton)
                .should('be.visible')
                .wait(500)
                .contains('Invite the user to set their own password')
                .click();
        });
    }

    /**
    * This method is used to delete created User
    * @param  {String} userName -  userName
    */
    static deleteUser(userName) {

        managepage.navigateToManageSection();
        managepage.navigateToUserPage();

        cy.get(LIST_USERS).within(() => {
            cy.get(USER_DELETE).first().click();
        });

        cy.get('p').should(($p) => {
            // make sure the first contains User name
            expect($p.first()).to.contain(userName);
        })
        cy.get(DELETE_USER_INPUT).within(() => {
            cy.get('input').type(userName);
        });
        cy.get(DELETE_USER_BUTTON).click({ force: true });
    }

    /**
     * This method is to use get and validate the summery wizard of bussiness user creation
     * @param  {object} userProf - User profile details (ex: json object)
     */
    static createNewBussinessUserSummary(userProf){

        cy.wait(3000)
        cy.get(LBL_SUMMARY_PORFILE_HEADING).invoke("text").then((text) =>{
            expect(text.trim()).contain(userProf.firstName);
        })
        cy.get(LBL_PROFILE_DESRIPTION).invoke("text").then((text) =>{
            expect(text.trim()).contain(userProf.userName);
        })

       cy.get(LBL_SUMMARY_LABEL).invoke("text").then((text)=>{
            expect(text.trim()).contain("Name")
        });
        
        cy.get(LBL_SUMMARY_VALUE).invoke("text").then((text)=>{
            expect(text.trim()).contain(userProf.firstName+" "+userProf.lastName);
        });

        cy.get(LBL_SUMMARY_LABEL).invoke("text").then((text)=>{
            expect(text.trim()).contain("Password option")
        });

        if(userProf.setPasswordOption == "InviteUserToSetPassowrd"){
            cy.get(LBL_SUMMARY_VALUE).invoke("text").then((text)=>{
                expect(text.trim()).contain("An email will be sent to "+ userProf.userName
                +" with the link to set the password.");
            });
        } 
        else 
        {
            cy.get(LBL_SUMMARY_VALUE).invoke("text").then((text)=>{
            expect(text.trim()).contain("The password was set by the administrator.");
        });   
        } 
    }
}

export default User;