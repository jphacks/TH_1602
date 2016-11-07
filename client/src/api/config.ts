import {Headers} from "@angular/http";
import {Preference} from "../utils/preference";
export class ApiConfig {
    static basePath = "http://monogement.azurewebsites.net"
    static apiPath = ApiConfig.basePath + "/api";
    static get defaultHeaders(): Headers {
        let header = new Headers();
        if(Preference.cookie) {
            header.append("Cookie", Preference.cookie);
        }
        return header;
    }
}