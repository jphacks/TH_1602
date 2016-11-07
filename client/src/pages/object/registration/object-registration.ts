import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController, NavParams } from 'ionic-angular';
import { ObjectTagApi, ObjectTagRequest, CategoryApi, ImageApi } from '../../../api';
import { MyApp } from '../../../app/app.component';
import { ImagePicker, getPlugin } from "ionic-native";

@Component({
  selector: 'page-object-registration',
  templateUrl: 'object-registration.html'
})

export class ObjectRegistrationPage {

  register: ObjectTagRequest = {name: '', category: 0};
  error = false;
  categoryName: string;
  badOperation = false;
  imageName: string = null;
  image: any = null;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public params: NavParams, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    if (!params.get("categoryId") || !params.get("categoryName")) {
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
    if (this.badOperation) {
      this.navCtrl.pop();
    }
  }

  private get objApi(): ObjectTagApi {
    return MyApp.injector.get(ObjectTagApi);
  }

  private get categoryApi(): CategoryApi {
    return MyApp.injector.get(CategoryApi);
  }

  private get imageApi(): ImageApi {
    return MyApp.injector.get(ImageApi);
  }

  public post() {
    if (this.register.name) {
      this.objApi.objectTagsPost(this.register).toPromise().then((response) => {
        if (this.image) {
          return this.imageApi.imagesObjectTagsIdPut(response.id, this.image).toPromise();
        }
      }, reason => {
        this.showError(reason);
      }).then(() => {
        this.navCtrl.pop();
      })
    }
  }

  showError(reason: {status: number}) {
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

  selectImage() {
    let permissions = getPlugin("cordova.plugins.permissions");
    new Promise((resolve, reject) => {
      permissions.hasPermission(permissions.READ_EXTERNAL_STORAGE, resolve, reject);
    }).then((result: {hasPermission: boolean}) => {
      if (!result.hasPermission) {
        return new Promise((resolve, reject) => {
          permissions.requestPermission(
            permissions.READ_EXTERNAL_STORAGE,
            function (status) {
              if (!status.hasPermission) reject(status); else resolve(status);
            },
            reject);
        })
      }
      return result;
    }).then((result: {hasPermission: boolean}) => {
      if (result && result.hasPermission) {
        return ImagePicker.getPictures({
          maximumImagesCount: 1
        });
      }
    }).then((results) => {
      if (results.length > 0) {
        this.image = results[0];
        this.imageName = this.image.split("/").pop();
      }
    }, (err) => {
    });
  }
}
