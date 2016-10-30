import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
declare function require(x: string): any;

const QRCode: any = require('qrcodejs2/qrcode.js');

@Component({
    selector: 'my-qrcode',
    template : ''
})

export class QrCodeComponent implements OnInit, OnChanges {

    @Input() data: string = null;

    constructor(private elementRef: ElementRef) {
        // do nothing
    }

    ngOnInit() {
        this.updateQrCode();
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (changes['data']) {
            this.updateQrCode();
        }
    }

    private updateQrCode() {
        //
        if ((this.data || null) == null) {
            return;
        }

        //
        let container = this.elementRef.nativeElement;
        let children = container.childNodes;
        for (let i = children.length - 1; i >= 0; i--) {
            container.removeChild(children[i]);
        }

        //
        new QRCode(this.elementRef.nativeElement, {
            text: this.data,
            width: 120,
            height: 120,
            colorDark: '#000000',
            colorLight: '#ffffff',
            useSVG: false,
            correctLevel: QRCode.CorrectLevel.H
        });
    }

}
