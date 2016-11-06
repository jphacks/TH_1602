import {NavController} from "ionic-angular";
import {BarcodeScanner} from "ionic-native";
import {URLSearchParams} from "@angular/http";
import {ObjectDetailsPage} from "../pages/object/details/object-details";
export class BarcodeScannerBehavior {
  private static format = {
    "all_1d": 61918,
    "aztec": 1,
    "codabar": 2,
    "code_128": 16,
    "code_39": 4,
    "code_93": 8,
    "data_matrix": 32,
    "ean_13": 128,
    "ean_8": 64,
    "itf": 256,
    "maxicode": 512,
    "msi": 131072,
    "pdf_417": 1024,
    "plessey": 262144,
    "qr_code": 2048,
    "rss_14": 4096,
    "rss_expanded": 8192,
    "upc_a": 16384,
    "upc_e": 32768,
    "upc_ean_extension": 65536
  };

  public static run(navCtrl: NavController) {
    BarcodeScanner.scan().then((result: BarcodeScannerResult) => {
      if(result.cancelled) {
        return;
      }
      if(result.format.toLowerCase() === "qr_code") {
        BarcodeScannerBehavior.onQRCode(result.text, navCtrl);
      } else if((BarcodeScannerBehavior.format[result.format.toLowerCase()] & BarcodeScannerBehavior.format.all_1d) !== 0) {
        BarcodeScannerBehavior.on1DCode(result.text, navCtrl);
      }
    }, error => {
      console.log(error)
    });
  }

  private static onQRCode(text: string, navCtrl: NavController) {
    let parser = document.createElement("a");
    parser.href = text;
    let params = new URLSearchParams(parser.search && parser.search.substring(1));
    if(parser.protocol === "monogement:" && parser.pathname === "//object-tag" && params.get("id")) {
      navCtrl.push(ObjectDetailsPage, { objId: params.get("id") });
    }
  }

  private static on1DCode(text: string, navCtrl: NavController) {

  }
}

interface BarcodeScannerResult {
  format: string;
  text: string;
  cancelled: boolean;
}