import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule, DefaultRouterStateSerializer,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxElectronModule } from 'ngx-electron';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookTableModule } from './book-table/book-table.module';
import { WaiterCockpitModule } from './cockpit-area/cockpit.module';
import { ConfigModule } from './core/config/config.module';
import { CoreModule } from './core/core.module';
import { EmailConfirmationModule } from './email-confirmations/email-confirmations.module';
import { HeaderModule } from './header/header.module';
import { HomeModule } from './home/home.module';
import { MenuModule } from './menu/menu.module';
import { WebviewDirective } from './shared/directives/webview.directive';
import { SidenavModule } from './sidenav/sidenav.module';
import { CustomSerializer, effects, reducers } from './store';
import { UserAreaModule } from './user-area/user-area.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ConfigModule,
    NgxElectronModule,
    HeaderModule,
    HomeModule,
    MenuModule,
    HeaderModule,
    BookTableModule,
    SidenavModule,
    WaiterCockpitModule,
    UserAreaModule,
    CoreModule,
    EmailConfirmationModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: environment.production,
    }),
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot({ serializer: DefaultRouterStateSerializer }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    HttpClientModule
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  declarations: [AppComponent, WebviewDirective],
  bootstrap: [AppComponent],
})
export class AppModule {}
