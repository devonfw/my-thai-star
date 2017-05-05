import { Provider, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { environment, BackendType } from './../../../environments/environment';
import { IDishesDataService } from './dishes/dishes-data-service';
import { DishesInMemoryService } from './dishes/dishes-in-memory.service';
import { DishesRestService } from './dishes/dishes-rest.service';

export function getDishDataService(): Provider {
    switch (environment.backendType) {
      case BackendType.REST:
        return  { provide: IDishesDataService, useClass: DishesRestService };
      case BackendType.IN_MEMORY:
      default: {
        return  { provide: IDishesDataService, useClass: DishesInMemoryService };
      }
    }
};


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
  ],
  declarations: [],
  providers: [getDishDataService()],
})
export class BackendModule { }
