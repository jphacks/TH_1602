import {Component, ViewChild, Injector} from '@angular/core';
import {Platform, NavController} from 'ionic-angular';
import {StatusBar, Splashscreen, BarcodeScanner} from 'ionic-native';
import {LicensePage, HomePage, CategoryListPage, ObjectRegistrationPage, UserListPage, LoginPage} from '../pages'
import {Preference} from "../utils/preference";
import {LoginApi, MyApi, UserInfoResponse} from "../api/";
import {URLSearchParams} from "@angular/http";

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
  profile: UserInfoResponse = null;

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
      this.profile = this.myApi.myProfileGet();
      this.loginApi.login().toPromise().then(data => {
        return this.myApi.myProfileGet().toPromise();
      }).then(data => {
        this.profile = data;
      });
      this.rootPage = HomePage;
      this.login = true;
    }

    window["handleOpenURL"] = (urlString: string) => {
      let parser = document.createElement("a");
      parser.href = urlString;
      if(parser.protocol === "monogement://") {
        this.gotMonogementUri(parser.pathname, new URLSearchParams(parser.search));
      }
    }
  }

  private gotMonogementUri(path: string, params: URLSearchParams) {
    switch(path) {
      case "//callback":
        if(!this.login) {
          this.rootPage = HomePage;
          this.login = true;
          Preference.username = params.get("user_name");
          Preference.code = params.get("code");
          this.loginApi.login().toPromise().then(data => {
            return this.myApi.myProfileGet().toPromise();
          }).then(data => {
            this.profile = data;
          });
        }
        break;
    }
  }

  private get loginApi(): LoginApi {
    return MyApp.injector.get(LoginApi);
  }
  
  private get myApi(): MyApi {
    return MyApp.injector.get(MyApi);
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
