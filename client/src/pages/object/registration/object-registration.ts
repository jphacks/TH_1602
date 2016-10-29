import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ObjectTagApi } from '../../../api/api/ObjectTagApi';
import { MyApp } from '../../../app/app.component';

@Component({
  selector: 'page-object-registration',
  templateUrl: 'object-registration.html'
})

export class ObjectRegistrationPage {

  register = {}
  error = false
  constructor(public navCtrl: NavController, public params: NavParams) {
    console.log('ok')
  }

  private get api(): ObjectTagApi {
    return MyApp.injector.get(ObjectTagApi)
  }

  public post () {
    console.log('post')
    console.log(this.register)
    var log = this.api.objectTagsPost(this.register).toPromise().then((response) => {

    }).catch(() => {
      this.error = true;
    })
    console.log(log)
  }

}
