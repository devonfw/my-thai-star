import { config } from './config';
import { environment } from '../environments/environment';

import { NgModule, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { BackendModule } from './backend/backend.module';
import { CoreModule } from './core/core.module';
import { SidenavModule } from './sidenav/sidenav.module';
import { BookTableModule } from './book-table/book-table.module';
import { WaiterCockpitModule } from './cockpit-area/cockpit.module';
import { UserAreaModule } from './user-area/user-area.module';
import { EmailConfirmationModule } from './email-confirmations/email-confirmations.module';
import { HeaderModule } from './header/header.module';
import { HomeModule } from './home/home.module';
import { MenuModule } from './menu/menu.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderModule,
    HomeModule,
    MenuModule,
    BookTableModule,
    SidenavModule,
    WaiterCockpitModule,
    UserAreaModule,
    EmailConfirmationModule,
    CoreModule,
    BackendModule.forRoot({restServiceRoot: config.restServiceRoot, environmentType: environment.backendType}),
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
