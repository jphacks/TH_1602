import { AlertController } from "ionic-angular";
/**
 * Created by oboenikui on 2016/11/07.
 */
export class AlertUtil {
  static showError(reason: {status: number}, alertCtrl: AlertController) {
    if (reason.status !== 0) {
      this.showAlert('サーバーエラー', 'サーバーの管理者に問い合わせてください', alertCtrl);
    } else {
      this.showAlert('ネットワークエラー', 'インターネットに接続されているか，確認してください', alertCtrl);
    }
  }

  static showAlert(title: string, subTitle: string, alertCtrl: AlertController) {
    let alert = alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }
}