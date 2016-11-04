import {Component, ViewChild, Injector} from '@angular/core';
import {Platform, NavController} from 'ionic-angular';
import {StatusBar, Splashscreen, BarcodeScanner} from 'ionic-native';
import {LicensePage, HomePage, CategoryListPage, ObjectRegistrationPage, UserListPage, LoginPage} from '../pages'
import {Preference} from "../utils/preference";
import {LoginApi} from "../api/api/LoginApi";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: Component;
  categoryListPage = CategoryListPage;
  licensePage = LicensePage;
  objectRegistrationPage = ObjectRegistrationPage;
  userListPage = UserListPage;
  login: boolean;
  static injector: Injector = null;

  @ViewChild('content') nav: NavController;

  constructor(injector: Injector, platform: Platform) {
    MyApp.injector = injector;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    if (!Preference.username || !Preference.code) {
      this.rootPage = LoginPage;
      this.login = false;
    } else {
      this.loginApi.login().toPromise().then();
      this.rootPage = HomePage;
      this.login = true;
    }

    window["handleOpenURL"] = (url: string) => {
      let match = url.match(/^monogement:\/\/callback\?(.*)$/);
      if(match) {
        let params = match[1].split("&").reduce((p, c) => {
          let spr = c.split("=");
          p[spr[0]] = spr[1];
          return p;
        }, {});
        this.rootPage = HomePage;
        this.login = true;
        Preference.username = params["user_name"];
        Preference.code = params["code"];
        this.loginApi.login().toPromise();
      }
    }
  }

  private get loginApi(): LoginApi {
    return MyApp.injector.get(LoginApi);
  }

  openPage(page) {
    this.nav.push(page);
  }

  clearPageStack() {
    if (this.nav.canGoBack()) {
      this.nav.popToRoot();
    }
  }

  runQrCode() {
    BarcodeScanner.scan().then(result => {
      console.log(result)
    }, error => {
      console.log(error)
    });
  }
}
