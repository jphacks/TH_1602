import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ReservationApi  } from '../../../api/';
import { MyApp } from '../../../app/app.component'


@Component({
  selector: 'page-object-reservation',
  templateUrl: 'object-reservation.html'
})
export class ObjectReservationPage {
  public reservation = {
    comment: "", 
    user: [],
    object_tag_id: "",
    priority: 0,
    start_at: "",
    end_at: "",
    is_endless: false
  };
  public otherReservations = [];
  private error = false;
  private response;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.reservation.user.push(navParams.get('user'));
    this.reservation.object_tag_id = navParams.get('object_tag_id');
    this.reservation.start_at = this.formatTime("start");
    this.reservation.end_at = this.formatTime("end"); 
    this.otherReservations = navParams.get('reservations');
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
    let myRes = this.reservation;
    if(this.otherReservations != null){
      for(let anotherRes of this.otherReservations){
        if(anotherRes.start_at < myRes.end_at && myRes.start_at < anotherRes.end_at){
          this.showAlert('予定が被ってます', 'あなたが予約指定した期間はすでに別の人の予約が入っているので期間を変えてください');
          return;
        }  
      }
    }
    this.reservationApi.reservationsPost(this.reservation).toPromise().then((response) => {
        this.response = response;
        console.log("送信成功");
        this.navCtrl.popToRoot();
      }).catch(reason => { //エラー吐いたときの処理
        if (reason.status !== 0) {
          this.showAlert('サーバーエラー', 'サーバーの管理者に問い合わせてください');
        }else {
          this.showAlert('ネットワークエラー', 'インターネットに接続されているか，確認してください');
        }
      })
  }

  showAlert(title: string, subTitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }
  private get reservationApi(): ReservationApi {
    return MyApp.injector.get(ReservationApi)
  }
}
