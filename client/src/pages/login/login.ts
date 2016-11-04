import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {ApiConfig} from "../../api/config";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {

  }

  login() {
    let path = ApiConfig.basePath + "/Account/Login?isClientLogin=True";
    window.open(path, '_system', 'location=yes');
  }
}
