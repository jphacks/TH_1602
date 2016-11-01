import {Component, Input} from "@angular/core";
@Component({
  selector: 'my-img',
  template: `
<img class="image {{_class}}" *ngIf="_src && !error" src="{{_src}}" (error)="onError()" />
<div class="image {{_class}}" *ngIf="!_src || error">No Image</div>
`
})
export class MyImage {
  _src: string = null;
  _class: string = null;
  error = false;

  @Input()
  set src(src: string) {
    this.error = false;
    this._src = src;
  }

  @Input()
  set class(classStr: string) {
    this._class = classStr;
  }

  onError() {
    this.error = true;
  }
}
