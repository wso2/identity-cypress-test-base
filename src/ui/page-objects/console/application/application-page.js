
/**
 * Copyright 2020 WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * This software is the property of WSO2 Inc. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content."
 */

import developSection from "../console/console-landing-page.js";
import appManagment from "../application/application-page-object/application-common.js";
import appProtocolMgt from "../application/application-page-object/application-protocol.js";

class application {

    /**
     * Create application
     * @param  {} testData
     * @param  {} redirectUrl
     */
    static createApplication(testData, redirectUrl) {
        cy.wait(5000);
        developSection.navigateToApplicationPage();
        appManagment.clickNewApplicationButton();
        cy.log(testData.appType);
        if (testData.appType == "webApp") {
            appManagment.selectWebApplication();
            appManagment.validateApplicationWizardHeader("be.visible");
            //appManagment.clickSidePanelApplicationLink();
            if (testData.protocol === "saml") {
                appProtocolMgt.selectSAMLWebApplication();
                appProtocolMgt.provideAppNameSAML(testData.AppGeneralConfigs.samlIssuer);
                appProtocolMgt.provideAppIssuerSAML(testData.AppGeneralConfigs.samlIssuer);
                appProtocolMgt.provideACUrlsSAML(testData.AppGeneralConfigs.acsUrl);
                appProtocolMgt.addACUrlsSAML(testData.AppGeneralConfigs.acsUrl);
                appProtocolMgt.clickRegisterBtn();
                //TODO: List and validate the application
                developSection.navigateToApplicationPage();
                appManagment.getdetailFromAppList(testData, true);
            }
            if (testData.protocol == "oidc") {
                appProtocolMgt.selectApplicationProtocol("oidc");
                appProtocolMgt.addAppNameOIDC(testData.AppGeneralConfigs.issuer);
                appProtocolMgt.addRedirectURLsOIDC(redirectUrl);
                appProtocolMgt.clickRegisterBtn();
                developSection.navigateToApplicationPage();
                appManagment.getdetailFromAppList(testData.AppGeneralConfigs, true);
            }
        }
        else if (testData.appType == "singleApp") {
            appManagment.selectSingleApplication();
            appManagment.validateSingleApplicationWizardHeader("be.visible");
            appProtocolMgt.addSinglePageAppName(testData.AppGeneralConfigs.appName);
            appProtocolMgt.addRedirectURLsSinglePageApp(redirectUrl);
            appProtocolMgt.clickSinglePageApplicationRegisterBtn();
        }
    }

    /**
     * Delete Application
     * 
     */
    static deleteApplicationUI(appName) {
        developSection.navigateTotheDevelopSection();
        developSection.navigateToApplicationPage();
        appManagment.deleteApplication(appName);
    }

    /**
     * Update general settings
     * @param  {} testData
     */
    static updateAppGeneralSetting(testData) {
        developSection.navigateToApplicationPage();
        //TODO: write to click edit button
        appManagment.clickEditBtn(testData.samlIssuer);
        appManagment.navigateTab(2, "General");
        appManagment.updateApplicationName(testData.samlIssuer);
        appManagment.addApplicationImage(testData.samlIssuer);
        appManagment.enableDiscoverableApplication(testData.samlIssuer);
        appManagment.provideAccessUrl(testData.acsUrl, testData.samlIssuer);
        appManagment.checkJWKS_Endpoint(testData.samlIssuer);
        appManagment.addJWKS_Endpoint(testData.samlIssuer, testData.jwtEndpoint);
    }
}
export default application;