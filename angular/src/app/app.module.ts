// MODULES
import { MaterialModule } from '@angular/material';
import { NgModule, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CovalentChipsModule, CovalentCoreModule } from '@covalent/core';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { HttpModule, XHRBackend, RequestOptions, Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './app.routes';
import { BookTableComponent } from './book-table/book-table.component';
import { MenuComponent } from './menu/menu.component';
import { MenuCardComponent } from './menu/menu-card/menu-card.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavOrderComponent } from './sidenav/sidenav-order/sidenav-order.component';
import { InvitationDialogComponent } from './book-table/invitation-dialog/invitation-dialog.component';
import { BookTableDialogComponent } from './book-table/book-table-dialog/book-table-dialog.component';

// SERVICES
import { SidenavService } from './sidenav/shared/sidenav.service';
import { InvitationDialogService } from './book-table/invitation-dialog/shared/invitation-dialog.service';
import { BookTableDialogService } from './book-table/book-table-dialog/shared/book-table-dialog.service';
import { MenuService } from './menu/shared/menu.service';

// BACKEND
import { backendProvider } from './shared/backend/mock-backend';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookTableComponent,
    MenuComponent,
    MenuCardComponent,
    SidenavComponent,
    SidenavOrderComponent,
    InvitationDialogComponent,
    BookTableDialogComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    CovalentCoreModule.forRoot(),
    appRoutes,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule
  ],
  providers: [
    SidenavService,
    BookTableDialogService,
    InvitationDialogService,
    MenuService,
    backendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  entryComponents: [
    BookTableDialogComponent,
    InvitationDialogComponent
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
