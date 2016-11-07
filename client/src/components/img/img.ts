import { Component, Input, Output, EventEmitter } from "@angular/core";
@Component({
  selector: 'my-img',
  template: `
<ion-icon class="edit-image" name="image" *ngIf="_edit" (click)="onClick($event)"></ion-icon>
<img class="image {{_class}}" *ngIf="_src && !srcError" [src]="_src" (error)="onSrcError()" (click)="onClick($event)"/>
<img class="image {{_class}}" *ngIf="(!_src || srcError) && _placeholder && !placeholderError" [src]="_placeholder" (error)="onPlaceholderError()" (click)="onClick($event)" />
<div class="image {{_class}}" *ngIf="(!_placeholder || placeholderError) && (!_src || srcError)" (click)="onClick($event)">No Image</div>
`
})
export class MyImage {
  _src: string = null;
  _class: string = null;
  srcError = false;
  placeholderError = false;
  _placeholder: string = null;
  _edit: boolean = false;
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

  @Input()
  set edit(edit: boolean) {
    this._edit = edit;
  }

  @Output() editClick = new EventEmitter();

  onSrcError() {
    this.srcError = true;
  }

  onPlaceholderError() {
    this.placeholderError = true;
  }

  onClick(ev: MouseEvent) {
    if(this._edit) {
      this.editClick.emit(ev);
    }
  }
}
