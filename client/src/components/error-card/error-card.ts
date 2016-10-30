import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-error-card',
  template:
  `<ion-card *ngIf="_networkError">
    <ion-card-header>
      読み込みエラー
    </ion-card-header>
    <ion-card-content>
      ネットワーク設定を確認の上，スワイプして再読込してください．
    </ion-card-content>
  </ion-card>

  <ion-card *ngIf="_serverError">
    <ion-card-header>
      サーバーエラー
    </ion-card-header>
    <ion-card-content>
      時間を置いて再度お試しください．
    </ion-card-content>
  </ion-card>`
})
export class MyErrorCard {
  _networkError: boolean = false;
  _serverError: boolean = false;

  @Input()
  set networkError(val: boolean) {
    this._networkError = val;
  }

  @Input()
  set serverError(val: boolean) {
    this._serverError = val;
  }
}