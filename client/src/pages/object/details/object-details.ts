import {Component, Input} from '@angular/core';

import {NavController, NavParams, LoadingController, Refresher, AlertController} from 'ionic-angular';
import {
  CategoryResponse,
  CategoryApi,
  ObjectTagResponse,
  ObjectTagApi,
  ReservationApi,
  ReservationRequest,
  ReservationResponse
} from '../../../api/';
import {MyApp} from '../../../app/app.component';
import {ObjectReservationPage} from '../reservation/object-reservation'
import {Preference} from "../../../utils/preference";

@Component({
  selector: 'page-object-details',
  templateUrl: 'object-details.html'
})
export class ObjectDetailsPage {
  catId: number;
  objId: string;
  objTag: ObjectTagResponse;
  catName: string;
  reservations: Array<ReservationResponse>;
  currentReservation: ReservationResponse = null;
  serverError = false;
  networkError = false;
  imgError = false;

  constructor(public navCtrl: NavController, private navParams: NavParams, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.objId = navParams.get("objId");
    this.objTag = navParams.get("objectTag");
    if(this.objTag) {
      this.catId = this.objTag.category.id;
      this.catName = this.objTag.category.name;
    }
    let loader = this.loadingCtrl.create({
      content: "読み込み中..."
    });
    loader.present();
    this.load(() => loader.dismiss());
  }

  load(finish?: () => any) {
    if (!this.objTag) {
      this.objectApi.objectTagsIdGet(this.objId).toPromise()
        .then(data => {
          this.objTag = data;
          this.getReservations(finish);
          this.catName = data.category.name;
          this.catId = data.category.id;
          this.imgError = false;
          this.serverError = false;
          this.networkError = false;

        }, reason => {
          this.serverError = reason.status !== 0;
          this.networkError = reason.status === 0;
          finish && finish();
        });
    } else {
      this.getReservations(finish);
    }
  }

  getReservations(finish?: () => any) {
    this.reservationApi.searchReservationsGet(this.objTag.id).toPromise()
      .then(data => {
        this.reservations = data.items.sort((a, b) => {
          if (this.objTag.bookingEnabled) {
            return a.startAt.valueOf() - b.startAt.valueOf()
          } else {
            return a.createdAt.valueOf() - b.createdAt.valueOf()
          }
        });
        if (this.reservations[0] && this.reservations[0].isActive) {
          this.currentReservation = this.reservations.shift();
        }

        this.serverError = false;
        this.networkError = false;
        finish && finish();
      }, reason => {
        this.serverError = reason.status !== 0;
        this.networkError = reason.status === 0;
        finish && finish();
      })
  }

  private get categoryApi(): CategoryApi {
    return MyApp.injector.get(CategoryApi);
  }

  private get objectApi(): ObjectTagApi {
    return MyApp.injector.get(ObjectTagApi);
  }

  private get reservationApi(): ReservationApi {
    return MyApp.injector.get(ReservationApi);
  }

  doRefresh(refresher: Refresher) {
    this.load(() => refresher.complete());
  }

  onImgError(event: UIEvent) {
    this.imgError = true;
  }

  checkIn() {
    let req: ReservationRequest = {}
    req.object_tag_id = this.objId
    let loader = this.loadingCtrl.create({
      content: "送信中..."
    });
    loader.present();
    this.reservationApi.reservationsPost(req).toPromise()
      .then(() => {
        loader.dismiss();
      }, reason => {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'エラー',
          message: '送信失敗'
        });
        alert.present();
      });
  }

  checkInTime() {
    let alert = this.alertCtrl.create({
      title: '今すぐ使用',
      message: 'いつまで使用するかを入力してください．',
      inputs: [
        {
          name: 'time',
          placeholder: '時間',
          type: 'time'
        }
      ],
      buttons: [
        {
          text: 'キャンセル',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: '設定',
          handler: data => {
            let req: ReservationRequest = {
              object_tag_id: this.objId,
              users: [Preference.username]
            };

            let spr = data["time"].split(":");
            let date = new Date();
            date.setHours(spr[0]);
            date.setMinutes(spr[1]);
            req.end_at = date;
            let loader = this.loadingCtrl.create({
              content: "送信中..."
            });
            loader.present();
            this.reservationApi.reservationsPost(req).toPromise().then(data => {
              loader.dismiss();
            }, reason => {
              loader.dismiss();
              let alert = this.alertCtrl.create({
                title: 'エラー',
                message: '送信失敗'
              });
              alert.present();
            });
          }
        }
      ]
    });
    alert.present();

  }

  reserve() {
    this.navCtrl.push(ObjectReservationPage, {object_tag_id: this.objId});
  }


}

@Component({
  selector: 'my-user-item',
  template: `<ion-item>
    <div class="users">{{_reservation.users[0].name}}</div>
    <div class="time" *ngIf="_reservation.startAt"><span> {{_reservation.startAt | date: 'yyyy/MM/dd hh:mm'}} </span>&nbsp;~&nbsp;<span *ngIf="_reservation.endAt"> {{_reservation.endAt | date: 'yyyy/MM/dd hh:mm'}} </span></div>
  </ion-item>`
})
export class MyUserItem {
  _reservation: ReservationResponse = null

  @Input()
  set reservation(reservation: ReservationResponse) {
    this._reservation = reservation;
  }
}