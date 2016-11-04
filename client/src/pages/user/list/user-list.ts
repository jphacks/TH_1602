import {Component} from '@angular/core';

import {NavController, LoadingController, Refresher} from 'ionic-angular';
import {UserInfoResponse, UserInfoApi} from '../../../api/';
import {MyApp} from '../../../app/app.component';
import {UserDetailsPage} from '../details/user-details';

@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html'
})
export class UserListPage {
  error: boolean = false;
  users: Array<UserInfoResponse> = null;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
    let loader = this.loadingCtrl.create({
      content: "読み込み中..."
    });
    loader.present();
    this.userApi.listUsersGet().toPromise()
      .then(data => {
        this.users = data.items;
        this.error = false;
        loader.dismiss();
      }, reason => {
        this.error = true;
        loader.dismiss();
      });
  }

  private get userApi(): UserInfoApi {
    return MyApp.injector.get(UserInfoApi);
  }

  doRefresh(refresher: Refresher) {
    this.userApi.listUsersGet().toPromise()
      .then(data => {
        this.users = data.items;
        this.error = false;
        refresher.complete();
      }, reason => {
        this.error = true;
        refresher.complete();
      });
  }

  push(user: UserInfoResponse) {
    this.navCtrl.push(UserDetailsPage, {
      userName: user.userName,
      userInfo: user
    });
  }

}

