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

import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as models from '../model/models';
import {ApiConfig} from '../config'
import 'rxjs/Rx';
import { Transfer, FileUploadResult } from "ionic-native";

/* tslint:disable:no-unused-variable member-ordering */

'use strict';

@Injectable()
export class MyApi {
    protected basePath = ApiConfig.apiPath;
    get defaultHeaders() : Headers { return ApiConfig.defaultHeaders };

    constructor(protected http: Http) {
    }

    /**
     * 現在の利用,予約,予約待ち状況を取得します
     *
     */
    public myStatusGet (extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/my/status';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * ユーザー画像を更新します
     *
     * @param itemUri 設定したいImageのUri
     */
    public myUpdateProfileImagePut (itemUri: string, extraHttpRequestParams?: any ) : Promise<FileUploadResult> {
        const path = this.basePath + '/my/update_profile_image';
        // verify required parameter 'item' is not null or undefined
        if (itemUri === null || itemUri === undefined) {
            throw new Error('Required parameter item was null or undefined when calling myUpdateProfileImagePut.');
        }

        return new Transfer().upload(itemUri, path)
    }

    /**
     * ユーザー情報を更新します
     *
     * @param item 変更したいユーザー情報
     */
    public myUpdateProfilePut (item: models.UserInfoRequest, extraHttpRequestParams?: any ) : Observable<models.UserInfoResponse> {
        const path = this.basePath + '/my/update_profile';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'item' is not null or undefined
        if (item === null || item === undefined) {
            throw new Error('Required parameter item was null or undefined when calling myUpdateProfilePut.');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'PUT',
            headers: headerParams,
            search: queryParameters
        };

        headerParams.set('Content-Type', 'application/json');
        requestOptions.body = JSON.stringify(item);

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

}
