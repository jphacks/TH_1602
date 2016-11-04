import {Component, Input} from "@angular/core";
@Component({
  selector: 'my-img',
  template: `
<img class="image {{_class}}" *ngIf="_src && !error" [src]="_src" (error)="onSrcError()" />
<img class="image {{_class}}" *ngIf="(!_src || srcError) && _placeholder && !placeholderError" [src]="_placeholder" (error)="onPlaceholderError()" />
<div class="image {{_class}}" *ngIf="!_src && !_placeholder || placeholderError && srcError">No Image</div>
`
})
export class MyImage {
  _src: string = null;
  _class: string = null;
  srcError = false;
  placeholderError = false;
  _placeholder: string = null;
  @Input()
  set src(src: string) {
    this.srcError = false;
    this._src = src;
  }

  @Input()
  set class(classStr: string) {
    this._class = classStr;
  }

  @Input()
  set placeholder(path: string) {
    this._placeholder = path;
    this.placeholderError = false;
  }

  onSrcError() {
    this.srcError = true;
  }

  onPlaceholderError() {
    this.placeholderError = true;
  }
}
