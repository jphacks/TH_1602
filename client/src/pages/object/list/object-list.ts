import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController, Refresher } from 'ionic-angular';
import { CategoryResponse, CategoryApi, ObjectTagResponse, ObjectTagApi } from '../../../api/';
import { MyApp } from '../../../app/app.component';
import { ObjectDetailsPage } from '../details/object-details';
import {ObjectRegistrationPage} from "../../../pages";

@Component({
  selector: 'page-object-list',
  templateUrl: 'object-list.html'
})
export class ObjectListPage {
  catId: number = null;
  networkError: boolean = false;
  serverError: boolean = false;
  value: string = null;
  category: CategoryResponse = null;
  objects: Array<ObjectTagResponse> = null;
  searchObjects: Array<ObjectTagResponse> = null;

  constructor(public navCtrl: NavController, private navParams: NavParams, public loadingCtrl: LoadingController) {
    this.catId = navParams.get("catId");
    this.category = navParams.get("category");
    if (!this.category) {
      this.categoryApi.categoriesIdGet(this.catId).toPromise().then((response) => {
        this.category = response;
      }, reason => {
      })
    }
    let loader = this.loadingCtrl.create({
      content: "読み込み中..."
    });
    loader.present();
    this.objectApi.listObjectTagsCategoryIdGet(this.catId.toString()).toPromise()
      .then(data => {
        this.objects = data.items;
        this.networkError = false;
        this.serverError = false;
        loader.dismiss();
      }, reason => {
        this.networkError = reason.status === 0;
        this.serverError = !this.networkError;
        loader.dismiss();
      })
  }

  private get categoryApi(): CategoryApi {
    return MyApp.injector.get(CategoryApi);
  }

  private get objectApi(): ObjectTagApi {
    return MyApp.injector.get(ObjectTagApi);
  }

  doRefresh(refresher: Refresher) {
    if (this.value == null) {
      this.objectApi.listObjectTagsCategoryIdGet(this.catId.toString()).toPromise().then(data => {
        this.objects = data.items;
        this.networkError = false;
        this.serverError = false;
        refresher.complete();
      }, reason => {
        this.networkError = reason.status === 0;
        this.serverError = !this.networkError;
        refresher.complete();
      });
    } else {
      this.search(this.value, () => refresher.complete());
    }
  }

  onInput(ev: UIEvent) {
    this.value = (<HTMLInputElement>ev.target).value;
    if (this.value.length === 0) {
      this.clear();
    } else {
      this.search(this.value);
    }
  }

  search(value: string, finish?: () => any) {
    this.objectApi.searchObjectTagsGet(this.catId.toString(), value.split(/[ 　\t]/)).toPromise().then(data => {
      this.searchObjects = data.items;
      this.networkError = false;
      this.serverError = false;
      if (finish) {
        finish();
      }
    }, reason => {
      this.searchObjects = null;
      this.networkError = reason.status === 0;
      this.serverError = !this.networkError;
      if (finish) {
        finish();
      }
    });
  }

  onClear(ev: UIEvent) {
    this.clear();
  }

  onCancel(ev: UIEvent) {
    this.clear();
  }

  clear() {
    this.searchObjects = null;
    this.value = null;
    if (this.objects === null) {
      let loader = this.loadingCtrl.create({
        content: "読み込み中..."
      });
      loader.present();
      this.objectApi.listObjectTagsCategoryIdGet(this.catId.toString()).toPromise()
        .then(data => {
          this.objects = data.items;
          this.networkError = false;
          this.serverError = false;
          loader.dismiss();
        }, reason => {
          this.networkError = reason.status === 0;
          this.serverError = !this.networkError;
          loader.dismiss();
        })
    } else {
      this.networkError = false;
      this.serverError = false;
    }
  }

  push(obj: ObjectTagResponse) {
    this.navCtrl.push(ObjectDetailsPage, {
      objId: obj.id,
      objTag: obj
    });
  }

  addObjectTag() {
    this.navCtrl.push(ObjectRegistrationPage, {
      categoryId: this.catId, categoryName: this.category && this.category.name || ""
    });
  }

}
