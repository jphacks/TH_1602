import { Component } from '@angular/core';

import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ReservationApi, ReservationRequest, ReservationResponse } from '../../../api/';
import { MyApp } from '../../../app/app.component'
import { DateFormatter } from "@angular/common/src/facade/intl";
import { Preference } from "../../../utils/preference";

@Component({
  selector: 'page-object-reservation',
  templateUrl: 'object-reservation.html'
})
export class ObjectReservationPage {
  public reservation: ReservationRequest = {};
  public start: string;
  public end: string;
  public otherReservations: ReservationResponse[];
  private response;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.reservation.users = [Preference.username];
    this.reservation.objectTagId = navParams.get('object_tag_id');
    this.timeInit();
    this.otherReservations = navParams.get('reservations');
    this.reservation.comment = '';
  }

  private timeInit() {
    let now = new Date();
    this.start = DateFormatter.format(now, "ja-JP", "yyyy-MM-ddThh:mm");
    this.end = DateFormatter.format(new Date(now.getTime() + 60 * 60 * 1000), "ja-JP", "yyyy-MM-ddThh:mm");
  }

  post() {
    let myRes = this.reservation;
    myRes.startAt = new Date(this.start);
    myRes.endAt = new Date(this.end);
    if (this.otherReservations != null) {
      for (let anotherRes of this.otherReservations) {
        if (anotherRes.startAt < myRes.endAt && myRes.startAt < anotherRes.endAt) {
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
      } else {
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
