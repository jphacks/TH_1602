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

/* tslint:disable:no-unused-variable member-ordering */

'use strict';

@Injectable()
export class PaginationEnabledApi {
    protected basePath = ApiConfig.apiPath;
    get defaultHeaders() : Headers { return ApiConfig.defaultHeaders };

    constructor(protected http: Http) {
    }

    /**
     * Categoryの一覧を返します
     * 
     */
    public listCategoriesGet (extraHttpRequestParams?: any ) : Observable<models.PaginationItem<models.CategoryResponse>> {
        const path = this.basePath + '/list/categories';

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
     * Categoryに含まれるObjectTagの一覧を返します
     * 
     * @param categoryId 取得したいObjectTagが含まれるCategoryId
     */
    public listObjectTagsCategoryIdGet (categoryId: string, extraHttpRequestParams?: any ) : Observable<models.PaginationItem<models.ObjectTagResponse>> {
        const path = this.basePath + '/list/object_tags/{category_id}'
            .replace('{' + 'category_id' + '}', String(categoryId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'categoryId' is not null or undefined
        if (categoryId === null || categoryId === undefined) {
            throw new Error('Required parameter categoryId was null or undefined when calling listObjectTagsCategoryIdGet.');
        }
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
     * Userの一覧を返します
     * 
     */
    public listUsersGet (extraHttpRequestParams?: any ) : Observable<models.PaginationItem<models.UserInfoResponse>> {
        const path = this.basePath + '/list/users';

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
     * Categoryの検索を結果を返します
     * 
     * @param keywords Categoryのキーワード(部分一致)
     */
    public searchCategoriesGet (keywords?: Array<string>, extraHttpRequestParams?: any ) : Observable<models.PaginationItem<models.CategoryResponse>> {
        const path = this.basePath + '/search/categories';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        if (keywords !== undefined) {
            queryParameters.set('keywords', String(keywords));
        }

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
     * ObjectTagの検索を結果を返します
     * 
     * @param categoryId ObjectTagのId
     * @param keywords ObjectTagのキーワード(部分一致)
     */
    public searchObjectTagsGet (categoryId?: string, keywords?: Array<string>, extraHttpRequestParams?: any ) : Observable<models.PaginationItem<models.ObjectTagResponse>> {
        const path = this.basePath + '/search/object_tags';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        if (categoryId !== undefined) {
            queryParameters.set('category_id', String(categoryId));
        }

        if (keywords !== undefined) {
            queryParameters.set('keywords', String(keywords));
        }

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
     * Reservationの検索を結果を返します
     * 
     * @param objectTagId 予約対象となるObjectTag
     * @param userName 予約ユーザーに含まれるuserのuser name
     * @param keywords Reservationの予約要件(部分一致)
     * @param sinceAt 指定時間以降に重なるものを検索 現在進行形の無期限貸出が存在する場合は、この値によらず含まれます。 
     * @param toAt 指定時間以前に重なるものを検索 現在進行形の無期限貸出が存在する場合は、この値によらず含まれます。 
     * @param includesPast 現在予約が終了しているものも検索に含めるかどうか。 defaultばfalseです。 
     */
    public searchReservationsGet (objectTagId?: string, userName?: string, keywords?: Array<string>, sinceAt?: Date, toAt?: Date, includesPast?: boolean, extraHttpRequestParams?: any ) : Observable<models.PaginationItem<models.ReservationResponse>> {
        const path = this.basePath + '/search/reservations';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        if (objectTagId !== undefined) {
            queryParameters.set('object_tag_id', String(objectTagId));
        }

        if (userName !== undefined) {
            queryParameters.set('user_name', String(userName));
        }

        if (keywords !== undefined) {
            queryParameters.set('keywords', String(keywords));
        }

        if (sinceAt !== undefined) {
            queryParameters.set('since_at', String(sinceAt));
        }

        if (toAt !== undefined) {
            queryParameters.set('to_at', String(toAt));
        }

        if (includesPast !== undefined) {
            queryParameters.set('includes_past', String(includesPast));
        }

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

}
