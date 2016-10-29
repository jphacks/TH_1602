import { Component, Input } from '@angular/core';

import { NavController, NavParams, LoadingController, Refresher } from 'ionic-angular';
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
  serverError = false;
  networkError = false;
  imgError = false;
  constructor(public navCtrl: NavController, private navParams: NavParams, private loadingCtrl: LoadingController) {
    this.catId = navParams.get("catid");
    this.objId = navParams.get("objid");
    this.objTag = navParams.get("object_tag");
    this.category = navParams.get("category");
    let loader = this.loadingCtrl.create({
      content: "読み込み中..."
    });
    loader.present();
    this.load(() => loader.dismiss());
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
        this.reservations = data.items;
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
}

@Component({
  selector: 'my-user-item',
  template:
  `<ion-item>
    <div class="owner">{{_reservation.owner.name}}</div>
    <div class="time" *ngIf="_reservation.startAt"><span> {{_reservation.startAt | date: 'yyyy/MM/dd hh:mm'}} </span>&nbsp;~&nbsp;<span *ngIf="_reservation.endAt"> {{_reservation.endAt | date: 'yyyy/MM/dd hh:mm'}} </span></div>
  </ion-item>`,
  styles: [`
    div.owner {
      font-size: 20px;
      font-weight: 700;
      color: black;
    }
    div.time {
      color: gray;
    }
`]
})
export class MyUserItem {
  _reservation: ReservationResponse = null

  @Input()
  set reservations(reservation: ReservationResponse) {
    this._reservation = reservation;
  }
}

