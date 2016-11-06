import {Directive, HostListener} from '@angular/core';
import {NavController} from 'ionic-angular';
import {BarcodeScannerBehavior} from "../../utils/barcode-scanner-behavior";

declare var navigator:any;

@Directive({
  selector: 'button[qrcode]',
})
export class QrCodeButtonDirective {

  constructor(private nav:NavController) {
  }

  @HostListener('click') onClick() {
    this.runQrCodeScanner();
  }

  /**
   * Runs QR code scanner, and navigate to appropriate page depending on data encoded in a QR code.
   */
  runQrCodeScanner() {
    BarcodeScannerBehavior.run(this.nav);
  }

}
