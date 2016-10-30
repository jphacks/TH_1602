import { Component, Input } from '@angular/core';

import { NavController, NavParams, LoadingController, Refresher, AlertController } from 'ionic-angular';
import { CategoryResponse, CategoryApi, ObjectTagResponse, ObjectTagApi, ReservationApi, ReservationResponse } from '../../../api/';
import { MyApp } from '../../../app/app.component';
import { MyErrorCard } from '../../../components/error-card';

@Component({
  selector: 'page-object-details',
  templateUrl: 'object-details.html'
})
export class ObjectDetailsPage {
  catId: number;
  objId: string;
  objTag: ObjectTagResponse;
  category: CategoryResponse;
  reservations: Array<ReservationResponse>;
  currentReservation: ReservationResponse = null;
  serverError = false;
  networkError = false;
  imgError = false;
  constructor(public navCtrl: NavController, private navParams: NavParams, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.catId = navParams.get("catid");
    this.objId = navParams.get("objid");
    this.objTag = navParams.get("object_tag");
    this.category = navParams.get("category");
    let loader = this.loadingCtrl.create({
      content: "読み込み中..."
    });
    loader.present();
    this.load(() => loader.dismiss());
    this.checkInTime();
  }

  load(finish?: () => any) {
    if (!this.objTag) {
      this.objectApi.objectTagsIdGet(this.objId).toPromise().then(data => {
        this.objTag = data;
        this.getReservations(finish);
        this.imgError = false;
      }).catch(reason => {
        this.serverError = reason.status !== 0;
        this.networkError = reason.status === 0;
        finish && finish();
      })
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
        if (this.reservations[0].isActive) {
          this.currentReservation = this.reservations.shift();
        }
        finish && finish();
      }).catch(reason => {
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
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Login',
          handler: data => {
            data["time"];
          }
        }
      ]
    });
    alert.present();

  }

  reservate() {

  }


}

@Component({
  selector: 'my-user-item',
  template:
  `<ion-item>
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

