import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { CategoryResponse, CategoryApi, ObjectTagResponse, ObjectTagApi } from '../../../api/';
import { MyApp } from '../../../app/app.component';

@Component({
  selector: 'page-object-list',
  templateUrl: 'object-list.html'
})
export class ObjectListPage {
  catId: number = null
  error: boolean = false;
  category: CategoryResponse = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.catId = navParams.get("catid");
    this.category = navParams.get("category")
    if(!this.category) {
      this.categoryApi.categoriesGet(this.catId).toPromise().then((response) => {
        this.category = response;
      }).catch(() => {
        this.error = true;
      })
    }
  }

  private get categoryApi(): CategoryApi {
    return MyApp.injector.get(CategoryApi);
  }

  private get objectApi(): ObjectTagApi {
    return MyApp.injector.get(ObjectTagApi);
  }
}
