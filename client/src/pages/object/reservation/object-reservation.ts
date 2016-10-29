import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { ReservationApi  } from '../../../api/';
import { MyApp } from '../../../app/app.component'


@Component({
  selector: 'page-object-reservation',
  templateUrl: 'object-reservation.html'
})
export class ObjectReservationPage {
  public item = {
    id: "", 
    comment: "", 
    user: [],
    object_tag_id: "",
    priority: 0,
    start_at: "",
    end_at: "",
    is_endless: false
  } ;
  error: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item.id = navParams.get('id');
    this.item.user.push(navParams.get('user'));
    this.item.object_tag_id = navParams.get('object_tag_id');
    this.item.start_at = this.formatTime("start");
    this.item.end_at = this.formatTime("end"); 
  }
  private  formatTime(startOrEnd: string) {
    let now = new Date();
    const y = now.getFullYear(), 
          m = ("0"+(now.getMonth()+1)).slice(-2), 
          d = ("0"+now.getDate()).slice(-2),
          min = ("0"+now.getMinutes()).slice(-2);
    if(startOrEnd === "start"){
      const h = ("0"+now.getHours()).slice(-2);
      return `${y}-${m}-${d}T${h}:${min}`;
    }
    else{
      const h = ("0"+(now.getHours()+1)).slice(-2);
      return `${y}-${m}-${d}T${h}:${min}`;
    }
  }
  
  private post() {
    console.log("click");
    this.reservationApi.reservationsPost(this.item).toPromise().then((response) => {
        null;
      }).catch(() => {
        this.error = true;
      })
  }

  private get reservationApi(): ReservationApi {
    return MyApp.injector.get(ReservationApi)
  }
}
