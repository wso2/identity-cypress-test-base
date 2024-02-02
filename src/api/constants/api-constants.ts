/*
 *   Copyright (c) 2024 WSO2 Inc. (http://www.wso2.org)
 *   All rights reserved.
 *   
 *   This software is the property of WSO2 Inc. and its suppliers, if any.
 *   Dissemination of any information or reproduction of any material contained
 *   herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 *   You may not alter or remove any copyright or other notice from copies of this content.
 */

/**
 * Class containing API request method constants.
 */
export class RequestMethodTypes {
    /**
     * Private constructor to avoid object instantiation from outside
     * the class.
     *
     * @hideconstructor
     */
    private constructor() { }

    public static readonly POST: string = "POST"
}

/**
 * Class containing API request content constants.
 */
export class RequestContentTypes {
    /**
     * Private constructor to avoid object instantiation from outside
     * the class.
     *
     * @hideconstructor
     */
    private constructor() { }

    public static readonly  URLENCODED: string = "application/x-www-form-urlencoded"
}
