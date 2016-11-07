export class Preference {
  static get username(): string {
    return window.localStorage.getItem("username");
  }

  static set username(username: string) {
    window.localStorage.setItem("username", username);
  }

  static get code(): string {
    return window.localStorage.getItem("code");
  }

  static set code(code: string) {
    window.localStorage.setItem("code", code);
  }

  static get cookie(): string {
    return window.localStorage.getItem("cookie");
  }

  static set cookie(cookie: string) {
    window.localStorage.setItem("cookie", cookie);
  }
}