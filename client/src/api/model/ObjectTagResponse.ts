/**
 * Tarusho.Server
 * Tarusho server API reference
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
import * as models from './models';

export interface ObjectTagResponse {
    

    /**
     * ObjectTagのId
     */
    id?: string;

    /**
     * 表示名
     */
    name?: string;

    /**
     * 場所
     */
    place?: string;

    /**
     * オブジェクトのURI
     */
    objectUri?: string;

    /**
     * Optional(バーコード)のURI
     */
    optionalUri?: string;

    /**
     * 説明文
     */
    description?: string;

    /**
     * 画像Uri
     */
    imageUri?: string;

    /**
     * 画像サムネイルuri
     */
    thumbnailImageUri?: string;

    /**
     * 現在利用中の予約Id
     */
    inUseReservationId?: string;

    /**
     * 将来の予約が可能か
     */
    bookingEnabled?: boolean;

    category?: models.IdNumberNamePair;
}
