import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-object-details',
  templateUrl: 'object-details.html'
})
export class ObjectDetailsPage {
  catId: number;
  objId: string;
  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.catId = navParams.get("catid");
    this.objId = navParams.get("objid");
  }

}
