import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ReservationApi, ReservationRequest, ReservationResponse  } from '../../../api/';
import { MyApp } from '../../../app/app.component'


@Component({
  selector: 'page-object-reservation',
  templateUrl: 'object-reservation.html'
})
export class ObjectReservationPage {
  public reservation: ReservationRequest = {};
  public start: string;
  public end: string;
  public otherReservations: ReservationResponse[];
  private error = false;
  private response;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.reservation.users.push(navParams.get('user'));
    this.reservation.objectTagId = navParams.get('object_tag_id');
    this.start = this.formatTime("start");
    this.end = this.formatTime("end");
    this.otherReservations = navParams.get('reservations');
    this.reservation.comment = '';
  }
  private formatTime(startOrEnd: string) {
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
  
  post() {
    let myRes = this.reservation;
    myRes.startAt = new Date(this.start);
    myRes.endAt = new Date(this.end);
    if(this.otherReservations != null){
      for(let anotherRes of this.otherReservations){
        if(anotherRes.startAt < myRes.endAt && myRes.startAt < anotherRes.endAt){
          this.showAlert('予定が被ってます', 'あなたが予約指定した期間はすでに別の人の予約が入っているので期間を変えてください');
          return;
        }  
      }
    }
    this.reservationApi.reservationsPost(this.reservation).toPromise().then((response) => {
        this.response = response;
        this.navCtrl.popToRoot();
      }, reason => {
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
