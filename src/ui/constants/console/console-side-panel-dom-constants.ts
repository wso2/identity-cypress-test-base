/**
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * Class containing Console Side Panel DOM constants.
 */
export class ConsoleSidePanelDomConstants {

    // Develop Features
    public static readonly APPLICATIONS_MENU_ITEM_DATA_ATTR: string = "side-panel-items-applications";
    public static readonly IDP_MENU_ITEM_DATA_ATTR: string = "side-panel-items-identity-providers";

    // Manage Features
    public static readonly USERS_MENU_ITEM_DATA_ATTR: string = "side-panel-items-users";
    public static readonly GROUPS_MENU_ITEM_DATA_ATTR: string = "side-panel-items-groups";
    public static readonly ROLES_MENU_ITEM_DATA_ATTR: string = "side-panel-items-roles";
    public static readonly USERSTORES_MENU_ITEM_DATA_ATTR: string = "side-panel-items-user-stores";
    public static readonly CERTIFICATES_MENU_ITEM_DATA_ATTR: string = "side-panel-items-certificates";
    public static readonly ATTRIBUTES_MENU_ITEM_DATA_ATTR: string = "side-panel-items-attribute-dialects";
    public static readonly DIALECTS_MENU_ITEM_DATA_ATTR: string = "side-panel-items-local-dialects";
    public static readonly OIDC_SCOPES_MENU_ITEM_DATA_ATTR: string = "side-panel-items-oidc-scopes";
    public static readonly EMAIL_TEMPLATES_MENU_ITEM_DATA_ATTR: string = "side-panel-items-email-templates";
    public static readonly REMOTE_FETCH_MENU_ITEM_DATA_ATTR: string = "side-panel-items-remote-fetch-config";
}
