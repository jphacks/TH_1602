import {Component} from '@angular/core';
import {Alert, NavController} from 'ionic-angular';
import {BarcodeScanner} from 'ionic-native';

declare var navigator: any;

@Component({
    templateUrl: 'qrcode-button.html',
    selector: 'my-qrcode-button',
})
export class QrCodeButtonComponent {
    isQrCodeScannerEnabled: false;

    constructor(private nav: NavController) {
        // do nothing
    }

    /**
     * Runs QR code scanner, and navigate to appropriate page depending on data encoded in a QR code.
     */
    runQrCodeScanner() {
        BarcodeScanner.scan().then(result => {
        }, error => {
            console.log(error)
        });
    }

}
