import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { DishesDataService } from './dishes/dishes-data-service';
import { LoginDataService } from './login/login-data-service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
  ],
  declarations: [],
  providers: [
    DishesDataService,
    LoginDataService],
})

export class BackendModule { }
