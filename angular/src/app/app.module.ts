import { config } from './config';
import { environment as env } from '../environments/environment';

// MODULES
import { NgModule, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { Md2Module }  from 'md2';
import { BackendModule } from './shared/backend/backend.module';
import { SidenavModule } from './sidenav/sidenav.module';
import { CovalentModule } from './shared/covalent.module';

// COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './app.routes';
import { BookTableComponent } from './book-table/book-table.component';
import { MenuComponent } from './menu/menu.component';
import { MenuCardComponent } from './menu/menu-card/menu-card.component';
import { OrderCockpitComponent } from './cockpit-area/order-cockpit/order-cockpit.component';
import { ReservationCockpitComponent } from './cockpit-area/reservation-cockpit/reservation-cockpit.component';
import { HeaderComponent } from './header/header.component';

import { InvitationDialogComponent } from './book-table/invitation-dialog/invitation-dialog.component';
import { BookTableDialogComponent } from './book-table/book-table-dialog/book-table-dialog.component';
import { LoginDialogComponent } from './user-area/login-dialog/login-dialog.component';
import { PasswordDialogComponent } from './user-area/password-dialog/password-dialog.component';
import { TwitterDialogComponent } from './user-area/twitter-dialog/twitter-dialog.component';
import { OrderDialogComponent } from './cockpit-area/order-cockpit/order-dialog/order-dialog.component';
import { ReservationDialogComponent } from './cockpit-area/reservation-cockpit/reservation-dialog/reservation-dialog.component';

// SERVICES
import { BookTableService } from './book-table/shared/book-table.service';
import { MenuService } from './menu/shared/menu.service';
import { WindowService } from './shared/windowService/windowService.service';
import { AuthGuard } from './shared/authentication/auth-guard.service';
import { AuthService } from './shared/authentication/auth.service';
import { OrderCockpitService } from './cockpit-area/order-cockpit/shared/order-cockpit.service';
import { ReservationCockpitService } from './cockpit-area/reservation-cockpit/shared/reservation-cockpit.service';
import { UserAreaService } from './user-area/shared/user-area.service';
import { SnackBarService } from './shared/snackService/snackService.service';

// DIRECTIVES
import { EqualValidatorDirective } from './user-area/login-dialog/equal-validator.directive';

// Remark: Imho it would be nice if app module consists mainly from other modules imports. e.g.:
// https://github.com/devonfw/devonfw-it-survival/blob/final-extras/app/app.module.ts

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookTableComponent,
    MenuComponent,
    MenuCardComponent,
    InvitationDialogComponent,
    BookTableDialogComponent,
    LoginDialogComponent,
    OrderCockpitComponent,
    ReservationCockpitComponent,
    EqualValidatorDirective,
    HeaderComponent,
    PasswordDialogComponent,
    TwitterDialogComponent,
    OrderDialogComponent,
    ReservationDialogComponent,
  ],
  imports: [
    BrowserModule,
    appRoutes,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    Md2Module,
    BackendModule.forRoot({restServiceRoot: config.restServiceRoot, environmentType: env.backendType}),
    SidenavModule,
    CovalentModule,
  ],
  providers: [
    BookTableService,
    MenuService,
    BaseRequestOptions,
    WindowService,
    AuthGuard,
    AuthService,
    OrderCockpitService,
    ReservationCockpitService,
    UserAreaService,
    SnackBarService,
  ],
  entryComponents: [
    BookTableDialogComponent,
    InvitationDialogComponent,
    LoginDialogComponent,
    PasswordDialogComponent,
    TwitterDialogComponent,
    OrderDialogComponent,
    ReservationDialogComponent,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
