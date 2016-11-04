import { Component } from '@angular/core';

import { NavController, LoadingController, Refresher } from 'ionic-angular';
import { CategoryResponse, CategoryApi, ObjectTagResponse, ObjectTagApi } from '../../../api/';
import { MyApp } from '../../../app/app.component';
import { ObjectListPage } from '../list/object-list';
import { ObjectDetailsPage } from '../details/object-details';

@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html'
})
export class CategoryListPage {
  networkError: boolean = false;
  serverError: boolean = false;
  value: string = null;
  categories: Array<CategoryResponse> = null;
  searchCategories: Array<CategoryResponse> = null;
  searchObjects: Array<ObjectTagResponse> = null;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
    let loader = this.loadingCtrl.create({
      content: "読み込み中..."
    });
    loader.present();
    this.categoryApi.listCategoriesGet().toPromise().then(data => {
      this.categories = data.items;
      this.networkError = false;
      this.serverError = false;
      loader.dismiss();
    }, reason => {
      this.networkError = reason.status === 0;
      this.serverError = !this.networkError;
      loader.dismiss();
    });
  }

  doRefresh(refresher: Refresher) {
    if (this.value == null) {
      this.categoryApi.listCategoriesGet().toPromise().then(data => {
        this.categories = data.items;
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

  private get categoryApi(): CategoryApi {
    return MyApp.injector.get(CategoryApi);
  }

  private get objectApi(): ObjectTagApi {
    return MyApp.injector.get(ObjectTagApi);
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
    this.networkError = false;
    this.serverError = false;
    var endCount = 0;
    let end = (error: boolean, status: number = -1) => {
      endCount++;
      this.networkError = this.networkError || error && status === 0;
      this.serverError = this.serverError || error && status !== 0;
      if (endCount === 1 && finish) {
        finish();
      }
    };
    this.categoryApi.searchCategoriesGet(value.split(/[ 　\t]/)).toPromise().then(data => {
      this.searchCategories = data.items;
      end(false);
    }, reason => {
      this.searchCategories = null;
      end(true, reason.status);
    });
    this.objectApi.searchObjectTagsGet(null, value.split(/[ 　\t]/)).toPromise().then(data => {
      this.searchObjects = data.items;
      end(false);
    }, reason => {
      this.searchObjects = null;
      end(true, reason.status);
    });
  }

  onClear(ev: UIEvent) {
    this.clear();
  }

  onCancel(ev: UIEvent) {
    this.clear();
  }

  clear() {
    this.searchCategories = null;
    this.searchObjects = null;
    this.value = null;
    if (this.categories === null) {
      let loader = this.loadingCtrl.create({
        content: "読み込み中..."
      });
      this.categoryApi.listCategoriesGet().toPromise().then(data => {
        this.categories = data.items;
        this.networkError = false;
        this.serverError = false;
        loader.dismiss();
      }, reason => {
        this.networkError = reason.status === 0;
        this.serverError = !this.networkError;
        loader.dismiss();
      });
    } else {
      this.networkError = false;
      this.serverError = false;
    }
  }

  push(category: CategoryResponse) {
    this.navCtrl.push(ObjectListPage, {
      catId: category.id,
      category: category
    });
  }

  pushObject(object: ObjectTagResponse) {
    this.navCtrl.push(ObjectDetailsPage, {
      catId: object.category.id,
      objId: object.id
    });
  }
}
