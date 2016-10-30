import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { LicensePage } from '../pages/license/license';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ObjectDetailsPage } from '../pages/object/details/object-details';
import { ObjectListPage } from '../pages/object/list/object-list';
import { CategoryListPage } from '../pages/object/category-list/category-list';
import { ObjectRegistrationPage } from '../pages/object/registration/object-registration';
import { ObjectReservationPage } from '../pages/object/reservation/object-reservation';
import { UserDetailsPage } from '../pages/user/details/user-details';
import { UserListPage } from '../pages/user/list/user-list';
import { HttpModule } from '@angular/http';
import { CategoryApi, AdminApi, DefaultApi, MyApi, ObjectTagApi, ReservationApi, UserInfoApi, PaginationEnabledApi } from '../api';
import { QrCodeButtonComponent } from '../components/qrcode-button/component';

@NgModule({
  declarations: [
    MyApp,
    LicensePage,
    HomePage,
    LoginPage,
    ObjectDetailsPage,
    ObjectListPage,
    CategoryListPage,
    ObjectRegistrationPage,
    ObjectReservationPage,
    UserDetailsPage,
    UserListPage,
    QrCodeButtonComponent,
  ],
  imports: [
    IonicModule.forRoot(MyApp, {}, {
      links: [
        { component: HomePage, name: 'Home', segment: '', defaultHistory: []},
        { component: LoginPage, name: 'Login', segment: 'login' },
        { component: LicensePage, name: 'License', segment: 'license' },
        { component: ObjectDetailsPage, name: 'ObjectDetails', segment: 'object/:catid/:objid' },
        { component: ObjectListPage, name: 'ObjectList', segment: 'object/:catid' },
        { component: CategoryListPage, name: 'CategoryList', segment: 'object' },
        { component: ObjectRegistrationPage, name: 'ObjectRegistration', segment: 'object/registration' },
        { component: ObjectReservationPage, name: 'ObjectReservation', segment: 'object/reservation' },
        { component: UserDetailsPage, name: 'UserDetails', segment: 'user/:id' },
        { component: UserListPage, name: 'UserList', segment: 'user' },
        { component: QrCodeButtonComponent, name: 'QrCode', segment: 'qrcode' },
      ]
    }), HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LicensePage,
    HomePage,
    LoginPage,
    ObjectDetailsPage,
    ObjectListPage,
    CategoryListPage,
    ObjectRegistrationPage,
    ObjectReservationPage,
    UserDetailsPage,
    UserListPage,
    QrCodeButtonComponent,
  ],
  providers: [CategoryApi, AdminApi, DefaultApi, MyApi, ObjectTagApi, ReservationApi, UserInfoApi, PaginationEnabledApi]
})
export class AppModule {}
