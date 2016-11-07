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
} from '../../../api/';
import {MyApp} from '../../../app/app.component';
import {ObjectDetailsPage} from '../../object/details/object-details';
import { JsonReservationResponse, ReservationResponseConverter } from "../../../api/model/ReservationResponse";

@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html'
})
export class UserDetailsPage {
  userName: string;
  userInfo: UserInfoResponse;
  objTag: ObjectTagResponse;
  error: boolean = false;
  usingObjects: ReservationResponse[] = [];
  reservations: ReservationResponse[] = [];

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.userName = navParams.get("userName");
    this.userInfo = navParams.get("userInfo");
    if (!this.userInfo) {
      this.userApi.usersUserNameGet(this.userName).toPromise()
        .then(data => {
          this.userInfo = data;
          return this.reservationGet;
        }, reason => {
          this.error = true;
        });
    }
    this.reservationGet;
  }

  gotReservation(response: PaginationItem<JsonReservationResponse>) {
    if(!response) {
      return;
    }
    let now = new Date();
    let reservations = ReservationResponseConverter.convertAll(response.items).sort((a, b) => {
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
    return this.reservationApi.searchReservationsGet(undefined, this.userName).toPromise()
      .then((response) => {
        this.gotReservation(response);
      }, reason => {
        this.error = true;
      });
  }

  push(res: ReservationResponse) {
    let objId = res.objectTag.id;
    this.navCtrl.push(ObjectDetailsPage, {
      objId: objId
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
}
