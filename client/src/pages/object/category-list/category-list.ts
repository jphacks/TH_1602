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
  error: boolean = false;
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
      this.error = false;
      loader.dismiss();
    }).catch(reason => {
      this.error = true;
      loader.dismiss();
    });
  }

  doRefresh(refresher: Refresher) {
    if (this.value == null) {
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
    if (this.value.length === 0) {
      this.clear();
    } else {
      this.search(this.value);
    }
  }

  search(value: string, finish?: () => any) {
    this.error = false;
    var endCount = 0;
    let end = (error: boolean) => {
      endCount++;
      this.error = error || this.error
      if (endCount === 1 && finish) {
        finish();
      }
    }
    this.categoryApi.searchCategoriesGet(value.split(/[ 　\t]/)).toPromise().then(data => {
      this.searchCategories = data.items;
      end(false);
    }).catch(reason => {
      this.searchCategories = null;
      end(true);
    });
    this.objectApi.searchObjectTagsGet(null, value.split(/[ 　\t]/)).toPromise().then(data => {
      this.searchObjects = data.items;
      end(false);
    }).catch(reason => {
      this.searchObjects = null;
      end(true);
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
    this.error = this.categories === null
  }

  push(category: CategoryResponse) {
    this.navCtrl.push(ObjectListPage, {
      catid: category.id,
      category: category
    });
  }

  pushObject(object: ObjectTagResponse) {
    this.navCtrl.push(ObjectDetailsPage, {
      catid: object.category.id,
      objid: object.id
    });
  }
}
