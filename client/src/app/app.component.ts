import { Component, ViewChild, Injector } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen, BarcodeScanner } from 'ionic-native';
import { LicensePage, HomePage, CategoryListPage, ObjectRegistrationPage, UserListPage } from '../pages'
import { QrCodeButtonComponent } from '../components';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;
  categoryListPage = CategoryListPage;
  licensePage = LicensePage;
  objectRegistrationPage = ObjectRegistrationPage;
  userListPage = UserListPage;
  qrCode = QrCodeButtonComponent;
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
  }

  openPage(page) {
    this.nav.push(page);
  }

  clearPageStack() {
    this.nav.popToRoot()
  }

  runQrCode() {
    BarcodeScanner.scan().then(result => {
        console.log(result)
      }, error => {
          console.log(error)
      });
  }
}
