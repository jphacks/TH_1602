import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { CategoryResponse, CategoryApi, ObjectTagResponse, ObjectTagApi, ReservationApi } from '../../../api/';
import { MyApp } from '../../../app/app.component';

@Component({
  selector: 'page-object-details',
  templateUrl: 'object-details.html'
})
export class ObjectDetailsPage {
  catId: number;
  objId: string;
  objTag: ObjectTagResponse;
  category: CategoryResponse;
  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.catId = navParams.get("catid");
    this.objId = navParams.get("objid");
    this.objTag = navParams.get("object_tag");
    this.category = navParams.get("category");
    if(!this.objTag) {
      this.objectApi.objectTagsIdGet(this.objId).toPromise().then(data => {
        this.objTag = data;
      }).catch(reason => {
        
      })
    }
  }

  private get categoryApi(): CategoryApi {
    return MyApp.injector.get(CategoryApi);
  }

  private get objectApi(): ObjectTagApi {
    return MyApp.injector.get(ObjectTagApi);
  }

  private get reservationApi(): ReservationApi {
    return MyApp.injector.get(ReservationApi);
  }

}
