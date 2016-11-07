import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {ApiConfig} from "../config";
import {Preference} from "../../utils/preference";

/* tslint:disable:no-unused-variable member-ordering */

'use strict';

@Injectable()
export class LoginApi {
  protected basePath = ApiConfig.apiPath;
  get defaultHeaders() : Headers { return ApiConfig.defaultHeaders };

  constructor() {
  }

  /**
   * ログインします
   *
   * @param username ユーザー名
   * @param code ログインコード
   */
  public login () {
    const path = this.basePath + '/login';
    let username = Preference.username;
    let code = Preference.code;

    // verify required parameter 'id' is not null or undefined
    if (username === null || username === undefined || code === null || code === undefined) {
      throw new Error('Required parameter id was null or undefined when calling imagesObjectTagsIdPut.');
    }

    return Observable.create(observer => {
      let formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();

      formData.append("username", username);
      formData.append("token", code);
      xhr.withCredentials = true;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(xhr.response);
            observer.complete();
          } else if(xhr.status === 204) {
            observer.next(xhr.response);
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.open('POST', path, true);
      xhr.send(formData);
    });
  }
}
