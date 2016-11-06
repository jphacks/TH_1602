import {Component} from '@angular/core';
import {NavController, AlertController, LoadingController, ToastController} from 'ionic-angular';
import {NavParams} from 'ionic-angular';
import {ObjectTagApi, ObjectTagRequest, CategoryApi, CategoryResponse} from '../../../api';
import {MyApp} from '../../../app/app.component';
import {ObjectListPage} from "../../../pages";

@Component({
  selector: 'page-object-registration',
  templateUrl: 'object-registration.html'
})

export class ObjectRegistrationPage {

  register: ObjectTagRequest = {name: '', category: 0};
  error = false;
  categoryName: string;
  badOperation = false;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public params: NavParams, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    if(!params.get("categoryId") || !params.get("categoryName")) {
      toastCtrl.create({
        message: '不正な操作',
        duration: 3000,
        position: 'bottom'
      }).present();
      this.badOperation = true;
    } else {
      this.register["category"] = params.get("categoryId");
      this.categoryName = params.get("categoryName");
    }
  }

  ionViewDidEnter() {
    if(this.badOperation) {
      this.navCtrl.pop();
    }
  }

  private get objApi(): ObjectTagApi {
    return MyApp.injector.get(ObjectTagApi);
  }

  private get categoryApi(): CategoryApi {
    return MyApp.injector.get(CategoryApi);
  }

  public post() {
    if (this.register.name) {
      this.objApi.objectTagsPost(this.register).toPromise().then((response) => {
        this.navCtrl.pop();
      }, reason => {
        this.showError(reason);
      });
    }
  }

  showError(reason: {status:number}) {
    if (reason.status !== 0) {
      this.showAlert('サーバーエラー', 'サーバーの管理者に問い合わせてください');
    } else {
      this.showAlert('ネットワークエラー', 'インターネットに接続されているか，確認してください');
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
