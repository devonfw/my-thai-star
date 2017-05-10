import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { DishesDataService } from './dishes/dishes-data-service';
import { LoginDataService } from './login/login-data-service';
import { provideClient } from './graphql-client';
import { ApolloModule } from 'apollo-angular';

export enum BackendType {
  IN_MEMORY,
  REST,
  GRAPHQL,
}

export class BackendConfig {
  restServiceRoot: string;
  environmentType: BackendType;
}

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ApolloModule.forRoot(provideClient),
  ],
  declarations: [],
  providers: [
    DishesDataService,
    LoginDataService,
  ],
})

export class BackendModule {

  constructor (@Optional() @SkipSelf() parentModule: BackendModule) {
    if (parentModule) {
      throw new Error('BackendModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(backendConfig: BackendConfig): ModuleWithProviders {
    return {
      ngModule: BackendModule,
      providers: [
        {provide: BackendConfig, useValue: backendConfig},
      ],
    };
  }

 }
