import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { UserInfoResponse, UserInfoApi, ObjectTagResponse, ObjectTagApi, ReservationApi } from '../../../api/';
import { MyApp } from '../../../app/app.component';

@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html'
})
export class UserDetailsPage {

  constructor(public navCtrl: NavController) {

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
