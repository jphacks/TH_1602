import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { UserInfoResponse, UserInfoApi, ObjectTagResponse, ObjectTagApi, ReservationResponse, ReservationApi } from '../../../api/';
import { MyApp } from '../../../app/app.component';
import { ObjectDetailsPage } from '../../details/object-details';

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

    this.reservationApi.searchReservationsGet(null, this.userName).toPromise().then((response) => {
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

  push(res: ReservationResponse) {
    let objid = res.objectTag.id; 
    this.objectApi.objectTagsIdGet(objid).toPromise().then((obj) => {
      this.navCtrl.push(ObjectDetailsPage, {
        catid: obj.category.id,
        objid: obj.id,
        object_tag: res.objectTag,
        category: obj.category
      });
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
