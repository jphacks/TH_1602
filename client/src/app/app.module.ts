import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { LicensePage, HomePage, LoginPage, ObjectDetailsPage, ObjectListPage, CategoryListPage, ObjectRegistrationPage, ObjectReservationPage, UserDetailsPage, UserListPage } from '../pages'
import { CategoryApi, AdminApi, MyApi, ObjectTagApi, ReservationApi, UserInfoApi, PaginationEnabledApi, LoginApi } from '../api';
import { MyErrorCard, MyImage } from '../components';
import { QrCodeButtonDirective } from '../directives';
import { MyUserItem } from "../pages/object/details/object-details";

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
    QrCodeButtonDirective,
    MyErrorCard,
    MyImage,
    MyUserItem
  ],
  imports: [
    IonicModule.forRoot(MyApp, {}, {
      links: [
        { component: HomePage, name: 'Home' },
        { component: LoginPage, name: 'Login' },
        { component: LicensePage, name: 'License', segment: 'license' },
        { component: ObjectDetailsPage, name: 'ObjectDetails', segment: 'object/details/:objId' },
        { component: ObjectListPage, name: 'ObjectList', segment: 'object/category/:catId' },
        { component: CategoryListPage, name: 'CategoryList', segment: 'object' },
        { component: ObjectRegistrationPage, name: 'ObjectRegistration', segment: 'object/registration' },
        { component: ObjectReservationPage, name: 'ObjectReservation', segment: 'object/reservation' },
        { component: UserDetailsPage, name: 'UserDetails', segment: 'user/:userName' },
        { component: UserListPage, name: 'UserList', segment: 'user' }
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
  ],
  providers: [CategoryApi, AdminApi, MyApi, ObjectTagApi, ReservationApi, UserInfoApi, PaginationEnabledApi, LoginApi]
})
export class AppModule {}
