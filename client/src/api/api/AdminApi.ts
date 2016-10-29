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

@Injectable()
export class AdminApi {
    protected basePath = 'https://tarusho.vbcpp.net';
    public defaultHeaders : Headers = new Headers();

    constructor(protected http: Http, @Optional() basePath: string) {
        if (basePath) {
            this.basePath = basePath;
        }
    }

    /**
     * 指定したidのCategory、および含まれる予約・ObjectTagを削除します
     * 
     * @param id 削除を行うCategoryのid
     */
    public categoriesDelete (id: boolean, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/categories/';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling categoriesDelete.');
        }
        if (id !== undefined) {
            queryParameters.set('id', String(id));
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
     * Categoryの新規登録を行います
     * 
     * @param item 新規登録を行う際の詳細情報(ただしidの値は不要/サーバーが自動で採番)
     */
    public categoriesPost (item: models.CategoryRequest, extraHttpRequestParams?: any ) : Observable<models.CategoryResponse> {
        const path = this.basePath + '/categories/';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'item' is not null or undefined
        if (item === null || item === undefined) {
            throw new Error('Required parameter item was null or undefined when calling categoriesPost.');
        }
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
     * 指定したidのCategoryに関する詳細を変更します
     * 
     * @param item 変更を行う詳細情報(idの値に格納された要素を変更)
     */
    public categoriesPut (item: models.CategoryResponse, extraHttpRequestParams?: any ) : Observable<models.CategoryResponse> {
        const path = this.basePath + '/categories/';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'item' is not null or undefined
        if (item === null || item === undefined) {
            throw new Error('Required parameter item was null or undefined when calling categoriesPut.');
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
     * 指定したidのObjectTagに関する情報・予約を削除します
     * 
     * @param id 削除を行うObjectTagのid
     */
    public objectTagsDelete (id: boolean, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/object_tags/';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling objectTagsDelete.');
        }
        if (id !== undefined) {
            queryParameters.set('id', String(id));
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
     * ObjectTagの新規登録を行います
     * 
     * @param item 新規登録を行う際の詳細情報(ただしidの値は不要/サーバーが自動で採番)
     */
    public objectTagsPost (item: ObjectTagRequest, extraHttpRequestParams?: any ) : Observable<ObjectTagResponse> {
        const path = this.basePath + '/object_tags/';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'item' is not null or undefined
        if (item === null || item === undefined) {
            throw new Error('Required parameter item was null or undefined when calling objectTagsPost.');
        }
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
     * 指定したidのObjectTagに関する詳細を変更します
     * 
     * @param item 変更を行う詳細情報(idの値に格納された要素を変更)
     */
    public objectTagsPut (item: ObjectTagRequest, extraHttpRequestParams?: any ) : Observable<ObjectTagResponse> {
        const path = this.basePath + '/object_tags/';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'item' is not null or undefined
        if (item === null || item === undefined) {
            throw new Error('Required parameter item was null or undefined when calling objectTagsPut.');
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
     * 指定したidのReservationを削除します
     * 
     * @param id 削除を行うReservationのid
     */
    public reservationsDelete (id: boolean, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/reservations/';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling reservationsDelete.');
        }
        if (id !== undefined) {
            queryParameters.set('id', String(id));
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
     * Reservationの新規登録を行います
     * 
     * @param item 新規登録を行う際の詳細情報(ただしidの値は不要/サーバーが自動で採番)
     */
    public reservationsPost (item: models.ReservationRequest, extraHttpRequestParams?: any ) : Observable<models.ReservationResponse> {
        const path = this.basePath + '/reservations/';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'item' is not null or undefined
        if (item === null || item === undefined) {
            throw new Error('Required parameter item was null or undefined when calling reservationsPost.');
        }
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
     * 指定したidのReservationに関する詳細を変更します
     * 
     * @param item 変更を行う詳細情報(idの値に格納された要素を変更)
     */
    public reservationsPut (item: models.ReservationRequest, extraHttpRequestParams?: any ) : Observable<models.ReservationResponse> {
        const path = this.basePath + '/reservations/';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'item' is not null or undefined
        if (item === null || item === undefined) {
            throw new Error('Required parameter item was null or undefined when calling reservationsPut.');
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

}
