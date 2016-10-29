import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController, Refresher } from 'ionic-angular';
import { CategoryResponse, CategoryApi, ObjectTagResponse, ObjectTagApi } from '../../../api/';
import { MyApp } from '../../../app/app.component';
import { ObjectDetailsPage } from '../details/object-details';

@Component({
  selector: 'page-object-list',
  templateUrl: 'object-list.html'
})
export class ObjectListPage {
  catId: number = null
  error: boolean = false;
  value: string = null;
  category: CategoryResponse = null;
  objects: Array<ObjectTagResponse> = null;
  searchObjects: Array<ObjectTagResponse> = null;

  constructor(public navCtrl: NavController, private navParams: NavParams, public loadingCtrl: LoadingController) {
    this.catId = navParams.get("catid");
    this.category = navParams.get("category")
    if (!this.category) {
      this.categoryApi.categoriesIdGet(this.catId).toPromise().then((response) => {
        this.category = response;
      }).catch(() => {
      })
    }
    let loader = this.loadingCtrl.create({
      content: "読み込み中..."
    });
    loader.present();
    this.objectApi.listObjectTagsCategoryIdGet(this.catId.toString()).toPromise()
      .then(data => {
        this.objects = data.items;
        this.error = false;
        loader.dismiss();
      }).catch(reason => {
        this.error = true;
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
    if(this.value == null) {
      this.objectApi.listObjectTagsCategoryIdGet(this.catId.toString()).toPromise().then(data => {
        this.objects = data.items;
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
      this.error = false;
      if(finish) {
        finish();
      }
    }).catch(reason => {
      this.searchObjects = null;
      this.error = true;
      if(finish) {
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
    this.error = this.objects === null
  }

  push(obj: ObjectTagResponse) {
    this.navCtrl.push(ObjectDetailsPage, {
      catid: obj.category.id,
      objid: obj.id
    });
  }

}
