import { Component } from '@angular/core';

import { NavController, LoadingController, Refresher } from 'ionic-angular';
import { CategoryResponse, CategoryApi, ObjectTagResponse, ObjectTagApi } from '../../../api/'
import { MyApp } from '../../../app/app.component'
import { ObjectListPage } from '../list/object-list'
import { ObjectDetailsPage } from '../details/object-details'

@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
  providers: []
})
export class CategoryListPage {
  error: boolean = false;
  value: string = null
  categories: Array<CategoryResponse> = null
  searchCategories: Array<CategoryResponse> = null
  searchObjects: Array<ObjectTagResponse> = null

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
    let loader = this.loadingCtrl.create({
      content: "読み込み中..."
    });
    loader.present();
    this.categoryApi.listCategoriesGet().toPromise().then(data => {
      this.categories = data.items;
      this.error = false;
      loader.dismiss();
    }).catch(reason => {
      this.error = true;
      loader.dismiss();
    });
  }

  doRefresh(refresher: Refresher) {
    if(this.value == null) {
      this.categoryApi.listCategoriesGet().toPromise().then(data => {
        this.categories = data.items;
        this.error = false;
        refresher.complete();
      }).catch(reason => {
        this.error = true;
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
    this.search(this.value);
  }

  search(value: string, finish?: () => any) {
    this.categoryApi.searchCategoriesGet(value.split(/[ 　\t]/)).toPromise().then(data => {
      this.searchCategories = data.items;
      this.error = false;
    }).catch(reason => {
      this.searchCategories = null;
      this.error = true;
    });
    this.objectApi.searchObjectTagsGet(null, value.split(/[ 　\t]/)).toPromise().then(data => {
      this.searchObjects = data.items;
      this.error = false;
    }).catch(reason => {
      this.searchObjects = null;
      this.error = true;
    });
  }

  onClear(ev: UIEvent) {
    this.searchCategories = null;
    this.searchObjects = null;
    this.value = null;
    this.error = this.categories === null
  }

  onCancel(ev: UIEvent) {
    this.searchCategories = null;
    this.searchObjects = null;
    this.value = null;
    this.error = this.categories === null
  }

  push(category: CategoryResponse) {
    this.navCtrl.push(ObjectListPage, {
      catid: category.id
    });
  }

  pushObject(object: ObjectTagResponse) {
    this.navCtrl.push(ObjectDetailsPage, {
      catid: object.category.id,
      id: object.id
    });
  }
}
