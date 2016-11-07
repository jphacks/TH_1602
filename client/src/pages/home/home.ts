import { Component } from '@angular/core';

import { NavController, NavParams, Refresher, AlertController } from 'ionic-angular';
import {
  UserInfoResponse,
  UserInfoApi,
  ObjectTagResponse,
  ObjectTagApi,
  ReservationResponse,
  ReservationApi,
  PaginationItem,
  MyApi
} from '../../api/';
import { MyApp } from '../../app/app.component';
import { ObjectDetailsPage } from '../object/details/object-details';
import { Preference } from "../../utils/preference";
import { CategoryListPage } from "../object/category-list/category-list";
import { ImagePicker, getPlugin } from "ionic-native";
import { AlertUtil } from "../../utils/alert-util";
import { JsonReservationResponse, ReservationResponseConverter } from "../../api/model/ReservationResponse";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userName: string;
  displayName: string;
  userInfo: UserInfoResponse;
  objTag: ObjectTagResponse;
  error: boolean = false;
  usingObjects: ReservationResponse[] = [];
  reservations: ReservationResponse[] = [];
  editing = false;
  image: string;

  constructor(public navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController) {
    this.userName = Preference.username;
    this.userApi.usersUserNameGet(this.userName).toPromise()
      .then(data => {
        this.userInfo = data;
        this.displayName = data.displayName;
        return this.reservationGet;
      }, reason => {
        this.error = true;
      });

  }

  gotReservation(response: PaginationItem<JsonReservationResponse>) {
    if (!response) {
      return;
    }
    let now = new Date();
    let reservations = ReservationResponseConverter.convertAll(response.items).sort((a, b) => {
      if (!a.startAt) return -1;
      if (!b.startAt) return 1;
      return a.startAt.getTime() - b.startAt.getTime();
    });
    for (var i = 0; i < reservations.length; i++) {
      if (reservations[i].startAt < now) {
        this.usingObjects.push(reservations.shift());
      }
    }
  }

  get reservationGet() {
    return this.reservationApi.searchReservationsGet(undefined, this.userName).toPromise()
      .then((response) => {
        this.gotReservation(response);
      }, reason => {
        this.error = true;
      });
  }

  push(res: ReservationResponse) {
    let objId = res.objectTag.id;
    this.navCtrl.push(ObjectDetailsPage, {
      objId: objId
    });
  }

  private get userApi(): UserInfoApi {
    return MyApp.injector.get(UserInfoApi);
  }

  private get myApi(): MyApi {
    return MyApp.injector.get(MyApi);
  }

  private get objectApi(): ObjectTagApi {
    return MyApp.injector.get(ObjectTagApi);
  }

  private get reservationApi(): ReservationApi {
    return MyApp.injector.get(ReservationApi);
  }

  doRefresh(refresher: Refresher) {
    this.userApi.usersUserNameGet(this.userName).toPromise()
      .then(data => {
        this.userInfo = data;
        return this.reservationGet;
      }, reason => {
        this.error = true;
        refresher.complete();
      })
      .then(() => {
        refresher.complete();
      });
  }

  search() {
    this.navCtrl.push(CategoryListPage, {focus: true})
  }

  edit(editting: boolean) {
    this.editing = !editting;
    if (editting) {
      if (this.image) {
        this.myApi.myUpdateProfileImagePut(this.image).then(done => {
          console.log(done);
          this.image = null;
          return this.myApi.myUpdateProfilePut({
            displayName: this.displayName
          }).toPromise();
        }).then(result => {
          this.userInfo = result;
        }).catch(reason => {
          AlertUtil.showError(reason, this.alertCtrl);
        });
      } else {
        this.myApi.myUpdateProfilePut({
          displayName: this.displayName
        }).toPromise().then(result => {
          this.userInfo = result;
        }).catch(reason => {
          AlertUtil.showError(reason, this.alertCtrl);
        });
      }
    }
  }

  editImage() {
    this.selectImage();
  }

  selectImage() {
    let permissions = getPlugin("cordova.plugins.permissions");
    new Promise((resolve, reject) => {
      permissions.hasPermission(permissions.READ_EXTERNAL_STORAGE, resolve, reject);
    }).then((result: {hasPermission: boolean}) => {
      if (!result.hasPermission) {
        return new Promise((resolve, reject) => {
          permissions.requestPermission(
            permissions.READ_EXTERNAL_STORAGE,
            function (status) {
              if (!status.hasPermission) reject(status); else resolve(status);
            },
            reject);
        })
      }
      return result;
    }).then((result: {hasPermission: boolean}) => {
      if (result && result.hasPermission) {
        return ImagePicker.getPictures({
          maximumImagesCount: 1
        });
      }
    }).then((results) => {
      if (results.length > 0) {
        this.image = results[0];
      }
    }, (err) => {
    });
  }
}
