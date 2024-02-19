/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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
 *
 */

/**
 * Class containing Login Page DOM constants.
 */
export class LoginPageDomConstants {

    /**
     * Private constructor to avoid object instantiation from outside
     * the class.
     *
     * @hideconstructor
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() { }

    // TODO: Use data test id's here.
    // Tracker: https://github.com/wso2-enterprise/asgardeo-product/issues/999
    public static readonly USERNAME_INPUT_DATA_ATTR: string = "login-page-username-input";
    public static readonly PASSWORD_INPUT_DATA_ATTR: string = "login-page-password-input";
    public static readonly CONTINUE_BUTTON_DATA_ATTR: string = "identifier-auth-continue-button";
    public static readonly SUBMIT_BUTTON_DATA_ATTR: string = "login-page-continue-login-button";
}
