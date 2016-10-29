import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { UserInfoResponse, UserInfoApi, ObjectTagResponse, ObjectTagApi, ReservationApi } from '../../../api/';
import { MyApp } from '../../../app/app.component';

@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html'
})
export class UserDetailsPage {
  userName: string;
  userInfo: UserInfoResponse;
  objTag: ObjectTagResponse;
  error: boolean = false;
  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.userName = navParams.get("username");
    this.userInfo = navParams.get("userinfo");
    if(!this.userInfo) {
      this.userApi.userInfoGet(this.userName).toPromise().then(data => {
        this.userInfo = data;
      }).catch(reason => {
        this.error = true;
      })
    }
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
