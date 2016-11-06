import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {NavParams} from 'ionic-angular';
import {ObjectTagApi, ObjectTagRequest, CategoryApi, CategoryResponse} from '../../../api';
import {MyApp} from '../../../app/app.component';

@Component({
  selector: 'page-object-registration',
  templateUrl: 'object-registration.html'
})

export class ObjectRegistrationPage {

  register: ObjectTagRequest = {name: '', category: 0};
  error = false;
  categories: CategoryResponse[] = null;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public params: NavParams) {
    this.categoryApi.listCategoriesGet().toPromise().then(data => {
      this.categories = data.items;
      if(this.categories.length > 0) {
        this.register.category = this.categories[0].id;
      }
    }, reason => {
      this.showError(reason);
      this.error = true;
    });
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
