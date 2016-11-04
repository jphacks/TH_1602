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
import 'rxjs/Rx';

/* tslint:disable:no-unused-variable member-ordering */

'use strict';
import {ApiConfig} from "../config";

@Injectable()
export class ImageApi {
    protected basePath = ApiConfig.apiPath;
    get defaultHeaders() : Headers { return ApiConfig.defaultHeaders };

    constructor(protected http: Http) {
    }

    /**
     * ObjectTagの画像をセットします
     * 
     * @param id 設定したいObjectTagのId
     * @param item 設定したいImageのByte列
     */
    public imagesObjectTagsIdPut (id: string, item: any, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/images/object_tags/{id}'
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let formParams = new URLSearchParams();

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling imagesObjectTagsIdPut.');
        }
        // verify required parameter 'item' is not null or undefined
        if (item === null || item === undefined) {
            throw new Error('Required parameter item was null or undefined when calling imagesObjectTagsIdPut.');
        }
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');

        formParams['item'] = item;

        let requestOptions: RequestOptionsArgs = {
            method: 'PUT',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();

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
     * @param item 設定したいImageのByte列
     */
    public myUpdateProfileImagePut (item: any, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/my/update_profile_image';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let formParams = new URLSearchParams();

        // verify required parameter 'item' is not null or undefined
        if (item === null || item === undefined) {
            throw new Error('Required parameter item was null or undefined when calling myUpdateProfileImagePut.');
        }
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');

        formParams['item'] = item;

        let requestOptions: RequestOptionsArgs = {
            method: 'PUT',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();

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
