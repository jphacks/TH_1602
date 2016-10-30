import { Component, ViewChild, Injector } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LicensePage } from '../pages/license/license';
import { LoginPage } from '../pages/login/login';
import { CategoryListPage } from '../pages/object/category-list/category-list';
import { ObjectRegistrationPage } from '../pages/object/registration/object-registration';
import { UserListPage } from '../pages/user/list/user-list';

import { MyApi, UserInfoResponse } from '../api/'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;
  categoryListPage = CategoryListPage;
  licensePage = LicensePage;
  objectRegistrationPage = ObjectRegistrationPage;
  userListPage = UserListPage;
  static injector: Injector = null;
  @ViewChild('content') nav: NavController;
  profile: UserInfoResponse = null;

  constructor(injector: Injector, platform: Platform) {
    MyApp.injector = injector
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    this.profile = this.myApi.myProfileGet();
  }
  
  private get myApi(): MyApi {
    return MyApp.injector.get(MyApi);
  }

  openPage(page) {
    this.nav.push(page);
  }

  clearPageStack() {
    this.nav.popToRoot()
  }
}
