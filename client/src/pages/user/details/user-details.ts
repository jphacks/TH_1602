import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { UserInfoResponse, UserInfoApi, ObjectTagResponse, ObjectTagApi, ReservationResponse, ReservationApi } from '../../../api/';
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
  usings: ReservationResponse[] = [];
  reservations: ReservationResponse[] =[];

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.userName = navParams.get("username");
    this.userInfo = navParams.get("userinfo");
    
    /* userInfoGetは存在しない
    if(!this.userInfo) {
      this.userApi.userInfoGet(this.userName).toPromise().then(data => {
        this.userInfo = data;
      }).catch(reason => {
        this.error = true;
      })
    }
    */

    this.reservationApi.searchReservationsGet(null, this.userName).toPromise().then((response) => {
      // 今使っているかどうかを判定
      // 使ってるときはusings, まだ使ってないときはreservations
      let now = new Date();
      for(let r of response.items){
        let resStart = new Date(r.startAt); 
        if(resStart < now ){
          this.usings.push(r);
        }
        else{
          this.reservations.push(r);
        }
      }
      
    }).catch(() => {
      this.error = true;
    })
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
