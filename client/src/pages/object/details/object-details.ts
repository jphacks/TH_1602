import {Component, Input} from '@angular/core';

import {
  NavController, NavParams, LoadingController, Refresher, AlertController,
  ToastController
} from 'ionic-angular';
import {
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
import { ReservationResponseConverter } from "../../../api/model/ReservationResponse";
import { UserDetailsPage } from "../../user/details/user-details";

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

  constructor(public navCtrl: NavController, private navParams: NavParams, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController) {
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

  get using():boolean {
    return this.currentReservation && this.currentReservation.users.length && (this.currentReservation.users[0].id === Preference.username)
  }

  get fabButtonState(): number {
    if(this.using) { // show checkout button
      return 0;
    } else if(this.currentReservation) { // show reserve button (either booking enabled or disabled)
      return 1;
    } else if(!this.objTag.bookingEnabled) { // show check in button
      return 2;
    } else { // show parent button
      return 3;
    }
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
        this.reservations = ReservationResponseConverter.convertAll(data.items).sort((a, b) => {
          if (this.objTag.bookingEnabled) {
            return a.startAt.valueOf() - b.startAt.valueOf()
          } else {
            return a.createdAt.valueOf() - b.createdAt.valueOf()
          }
        });
        if (this.reservations.length && this.reservations[0].isActive) {
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
    let req: ReservationRequest = {
      objectTagId: this.objId,
      users: [Preference.username]
    };
    let loader = this.loadingCtrl.create({
      content: "使用申請中..."
    });
    loader.present();
    this.reservationApi.reservationsPost(req).toPromise()
      .then(() => {
        loader.dismiss();
        this.toastCtrl.create({
          message: '使用申請完了',
          duration: 3000,
          position: 'bottom'
        }).present();
      }, reason => {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'エラー',
          message: '送信失敗'
        });
        alert.present();
      });
  }

  checkOut() {
    let loader = this.loadingCtrl.create({
      content: "完了処理中..."
    });
    loader.present();
    this.reservationApi.returnReservationIdPost(this.currentReservation.id).toPromise()
      .then(() => {
        loader.dismiss();
        this.toastCtrl.create({
          message: '完了',
          duration: 3000,
          position: 'bottom'
        }).present();
      }, reason => {
        console.log(reason);
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
              objectTagId: this.objId,
              users: [Preference.username]
            };

            let spr = data["time"].split(":");
            let date = new Date();
            date.setHours(spr[0]);
            date.setMinutes(spr[1]);
            req.startAt = new Date();
            if(date < req.startAt) {
              date.setDate(date.getDate() + 1);
            }
            req.endAt = date;
            let loader = this.loadingCtrl.create({
              content: "送信中..."
            });
            loader.present();
            this.reservationApi.reservationsPost(req).toPromise().then(data => {
              loader.dismiss();
              this.toastCtrl.create({
                message: '完了',
                duration: 3000,
                position: 'bottom'
              }).present();
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
    if(this.objTag.bookingEnabled) {
      this.navCtrl.push(ObjectReservationPage, {object_tag_id: this.objId});
    } else {
      let req: ReservationRequest = {
        objectTagId: this.objId,
        users: [Preference.username]
      };
      let loader = this.loadingCtrl.create({
        content: "予約中..."
      });
      loader.present();
      this.reservationApi.reservationsPost(req).toPromise()
        .then(() => {
          loader.dismiss();
          this.toastCtrl.create({
            message: '予約完了',
            duration: 3000,
            position: 'bottom'
          }).present();
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

  push(r: ReservationResponse) {
    this.navCtrl.push(UserDetailsPage, {
      userName: r.users[0].id
    })
  }
}

@Component({
  selector: 'my-user-item',
  template: `
<ion-item>
  <div class="users" *ngIf="_reservation?.users?.length">{{_reservation?.users[0]?.name}}&nbsp;@{{_reservation?.users[0]?.id}}</div>
  <div class="time" *ngIf="_reservation?.startAt"><span> {{_reservation?.startAt}} </span>&nbsp;~&nbsp;<span *ngIf="_reservation?.endAt"> {{_reservation?.endAt}} </span></div>
</ion-item>
`
})
export class MyUserItem {
  _reservation: ReservationResponse = null;

  @Input()
  set reservation(reservation: ReservationResponse) {
    this._reservation = reservation;
  }
}