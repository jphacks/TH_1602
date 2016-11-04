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

export interface ReservationRequest {
    

    /**
     * ReservationのId
     */
    id?: string;

    /**
     * 予約時の要件
     */
    comment?: string;

    /**
     * 使用者のユーザーId
     */
    users?: Array<string>;

    /**
     * 予約するObjectTagのId
     */
    object_tag_id?: string;

    /**
     * 優先度(列挙型にする予定)
     */
    priority?: number;

    /**
     * 予約の開始日時
     */
    start_at?: Date;

    /**
     * 予約の終了日時
     */
    end_at?: Date;

    /**
     * 予約の終了が無期限であるかどうか
     */
    isEndless?: boolean;
}
