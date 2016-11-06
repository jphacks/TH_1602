import {Component} from '@angular/core';

import {NavController, NavParams, Refresher} from 'ionic-angular';
import {
  UserInfoResponse,
  UserInfoApi,
  ObjectTagResponse,
  ObjectTagApi,
  ReservationResponse,
  ReservationApi,
  PaginationItem
} from '../../api/';
import {MyApp} from '../../app/app.component';
import {ObjectDetailsPage} from '../object/details/object-details';
import {Preference} from "../../utils/preference";
import {CategoryListPage} from "../../../.tmp/pages/object/category-list/category-list";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userName: string;
  userInfo: UserInfoResponse;
  objTag: ObjectTagResponse;
  error: boolean = false;
  usingObjects: ReservationResponse[] = [];
  reservations: ReservationResponse[] = [];

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.userName = Preference.username;
    this.userApi.usersUserNameGet(this.userName).toPromise()
      .then(data => {
        this.userInfo = data;
        return this.reservationGet;
      }, reason => {
        this.error = true;
      });

  }

  gotReservation(response: PaginationItem<ReservationResponse>) {
    if(!response) {
      return;
    }
    let now = new Date();
    let reservations = response.items.sort((a, b) => {
      if(!a.startAt) return -1;
      if(!b.startAt) return 1;
      return a.startAt.getTime() - b.startAt.getTime();
    });
    for(var i = 0; i < reservations.length; i++) {
      if(reservations[i].startAt < now) {
        this.usingObjects.push(reservations.shift());
      }
    }
  }

  get reservationGet() {
    return this.reservationApi.searchReservationsGet(null, this.userName).toPromise()
      .then((response) => {
        this.gotReservation(response);
      }, reason => {
        this.error = true;
      });
  }

  push(res: ReservationResponse) {
    let objId = res.objectTag.id;
    this.navCtrl.push(ObjectDetailsPage, {
      objId: objId,
      objectTag: res.objectTag
    });
  }

  private get userApi(): UserInfoApi {
    return MyApp.injector.get(UserInfoApi);
  }

  private get objectApi(): ObjectTagApi {
    return MyApp.injector.get(ObjectTagApi);
  }

  private get reservationApi(): ReservationApi {
    return MyApp.injector.get(ReservationApi);
  }

  doRefresh(refresher: Refresher) {
    this.userApi.usersUserNameGet(this.userName).toPromise()
      .then(data => {
        this.userInfo = data;
        return this.reservationGet;
      }, reason => {
        this.error = true;
        refresher.complete();
      })
      .then(() => {
        refresher.complete();
      });
  }

  search() {
    this.navCtrl.push(CategoryListPage, {focus: true})
  }
}
