import { MaterialModule } from '@angular/material';
import { NgModule, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CovalentChipsModule, CovalentCoreModule } from '@covalent/core';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './app.routes';
import { BookTableComponent } from './book-table/book-table.component';
import { MenuComponent } from './menu/menu.component';
import { MenuCardComponent } from './menu/menu-card/menu-card.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavSharedServiceService } from './sidenav/shared/sidenav-shared-service.service';
import { SidenavOrderComponent } from './sidenav/sidenav-order/sidenav-order.component';
import { InvitationDialogComponent } from './book-table/invitation-dialog/invitation-dialog.component';
import { BookTableDialogComponent } from './book-table/book-table-dialog/book-table-dialog.component';

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
  ],
  providers: [
    SidenavSharedServiceService
  ],
  entryComponents: [
    BookTableDialogComponent,
    InvitationDialogComponent
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
