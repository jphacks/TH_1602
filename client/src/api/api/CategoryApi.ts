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
export class CategoryApi {
    protected basePath = ApiConfig.apiPath;
    get defaultHeaders() : Headers { return ApiConfig.defaultHeaders };

    constructor(protected http: Http) {
    }

    /**
     * 指定したidのCategory、および含まれる予約・ObjectTagを削除します
     * 
     * @param id CategoryのId
     */
    public categoriesIdDelete (id: number, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/categories/{id}'
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling categoriesIdDelete.');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'DELETE',
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
     * 指定したidのカテゴリに関する詳細を返します
     * 
     * @param id CategoryのId
     */
    public categoriesIdGet (id: number, extraHttpRequestParams?: any ) : Observable<models.CategoryRequest> {
        const path = this.basePath + '/categories/{id}'
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling categoriesIdGet.');
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
     * 指定したidのCategoryに関する詳細を変更します
     * 
     * @param id CategoryのId
     * @param item 変更を行う詳細情報(idの値に格納された要素を変更)
     */
    public categoriesIdPut (id: number, item: models.CategoryResponse, extraHttpRequestParams?: any ) : Observable<models.CategoryResponse> {
        const path = this.basePath + '/categories/{id}'
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling categoriesIdPut.');
        }
        // verify required parameter 'item' is not null or undefined
        if (item === null || item === undefined) {
            throw new Error('Required parameter item was null or undefined when calling categoriesIdPut.');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'PUT',
            headers: headerParams,
            search: queryParameters
        };
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

    /**
     * Categoryの新規登録を行います
     * 
     * @param item 新規登録を行う際の詳細情報(ただしidの値は不要/サーバーが自動で採番)
     */
    public categoriesPost (item: models.CategoryRequest, extraHttpRequestParams?: any ) : Observable<models.CategoryResponse> {
        const path = this.basePath + '/categories';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'item' is not null or undefined
        if (item === null || item === undefined) {
            throw new Error('Required parameter item was null or undefined when calling categoriesPost.');
        }
        headerParams.append("Content-Type", "application/json");
        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
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

}
