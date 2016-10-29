import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import { CategoryResponse, CategoryApi } from '../../../api/'
import { MyApp } from '../../../app/app.component'

@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html'
})
export class CategoryListPage {
  categories: Array<CategoryResponse> = null
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
    let loader = this.loadingCtrl.create({
      content: "読み込み中..."
    });
    this.api.listCategoriesGet().subscribe(data=> {
      loader.dismiss();
      this.categories = data;
    });
  }

  private get api(): CategoryApi {
    return MyApp.injector.get(CategoryApi)
  }

}
