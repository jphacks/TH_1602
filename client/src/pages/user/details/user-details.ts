import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {
  UserInfoResponse,
  UserInfoApi,
  ObjectTagResponse,
  ObjectTagApi,
  ReservationResponse,
  ReservationApi
} from '../../../api/';
import {MyApp} from '../../../app/app.component';
import {ObjectDetailsPage} from '../../object/details/object-details';

@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html'
})
export class UserDetailsPage {
  userName: string;
  userInfo: UserInfoResponse;
  objTag: ObjectTagResponse;
  error: boolean = false;
  usings: ReservationResponse[] = [];
  reservations: ReservationResponse[] = [];

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.userName = navParams.get("userName");
    this.userInfo = navParams.get("userInfo");
    if (!this.userInfo) {
      this.userApi.usersUserNameGet(this.userName).toPromise()
        .then(data => {
          this.userInfo = data;
          this.getReservation();
        }, reason => {
          this.error = true;
        });
    }
    this.getReservation();
  }

  getReservation() {
    this.reservationApi.searchReservationsGet(null, this.userName).toPromise()
      .then((response) => {
        let now = new Date();
        for (let r of response.items) {
          let resStart = r.startAt;
          if (resStart < now) {
            this.usings.push(r);
          } else {
            this.reservations.push(r);
          }
        }
      }, reason => {
        this.error = true;
      });
  }

  push(res: ReservationResponse) {
    let objId = res.objectTag.id;
    this.objectApi.objectTagsIdGet(objId).toPromise().then(obj => {
      this.navCtrl.push(ObjectDetailsPage, {
        catId: obj.category.id,
        objId: obj.id,
        objectTag: res.objectTag,
        category: obj.category
      });
    }, reason => {

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
}
