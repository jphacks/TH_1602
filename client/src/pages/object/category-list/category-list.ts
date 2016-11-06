import {Component, ViewChild} from '@angular/core';

import {NavController, LoadingController, Refresher, AlertController, Searchbar, NavParams} from 'ionic-angular';
import { CategoryResponse, CategoryApi, ObjectTagResponse, ObjectTagApi, CategoryRequest, PaginationItem } from '../../../api/';
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

  @ViewChild("mySearchbar") searchbar: Searchbar;

  constructor(private navCtrl: NavController, private navParams: NavParams, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    let loader = this.loadingCtrl.create({
      content: "読み込み中..."
    });
    loader.present();
    this.categoryApi.listCategoriesGet().toPromise().then(data => {
      this.categories = data.items;
      this.networkError = false;
      this.serverError = false;
      loader.dismiss();

      if(this.navParams.get("focus")) {
        this.searchbar.setFocus();
      }
    }, reason => {
      this.networkError = reason.status === 0;
      this.serverError = !this.networkError;
      loader.dismiss();

      if(this.navParams.get("focus")) {
        this.searchbar.setFocus();
      }
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

  addCategory() {
    let alert = this.alertCtrl.create({
      title: 'カテゴリの追加',
      inputs: [
        {
          name: 'name',
          placeholder: 'カテゴリ名',
          type: 'text',

        },
        {
          name: 'description',
          placeholder: '説明',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'キャンセル',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: '設定',
          handler: data => {
            if(!data["name"]) {
              return false;
            }
            let req: CategoryRequest = {
              name: data["name"],
              description: data["description"]
            };

            let loader = this.loadingCtrl.create({
              content: "追加中..."
            });
            loader.present();
            this.categoryApi.categoriesPost(req).toPromise().then(data => {
              return this.categoryApi.listCategoriesGet().toPromise();
            }, reason => {
              loader.dismiss();
              let alert = this.alertCtrl.create({
                title: 'エラー',
                message: '追加失敗'
              });
              alert.present();
              return null;
            }).then(data => {
              if(data) {
                this.categories = data.items;
                this.networkError = false;
                this.serverError = false;
              }
              loader.dismiss();
            }, reason => {
              this.networkError = reason.status === 0;
              this.serverError = !this.networkError;
              loader.dismiss();
            });
          }
        }
      ]
    });
    alert.present();
  }
}
