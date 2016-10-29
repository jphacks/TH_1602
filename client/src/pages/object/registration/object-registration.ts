import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ObjectTagApi } from '../../../api/api/ObjectTagApi';
import { MyApp } from '../../../app/app.component';

@Component({
  selector: 'page-object-registration',
  templateUrl: 'object-registration.html'
})

export class ObjectRegistrationPage {

  register = {item: ''}
  error = false

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public params: NavParams) {
    console.log(this.register.item.length)
  }

  private get api(): ObjectTagApi {
    return MyApp.injector.get(ObjectTagApi)
  }

  public post () {
    if (this.register.item) {
      console.log('post')
      var response = this.api.objectTagsPost(this.register).toPromise().then((response) => {
        this.navCtrl.pop //うまく言ったときの処理
      }).catch(reason => { //エラー吐いたときの処理
      if (reason.status !== 0) {
        this.showAlert('サーバーエラー', 'サーバーの管理者に問い合わせてください');
      }else {
        this.showAlert('ネットワークエラー', 'インターネットに接続されているか，確認してください');
      }
      })
    }
    else {
      console.log('not post')
      return undefined;
    }
  }

  showAlert(title: string, subTitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

}
