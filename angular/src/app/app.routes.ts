import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { BookTableComponent } from './book-table/book-table.component';

const routes: Routes = [
  { path: '',   redirectTo: '/restaurant', pathMatch: 'full' },
  {component: HomeComponent, path: 'restaurant'},
  {component: MenuComponent, path: 'menu'},
  {component: BookTableComponent, path: 'bookTable'}];

// Remark: We have typescript on board, so please use types where those are avaiable, 
// overusing "any" is not that good (I fixed it here, but you will find more examples in the code base)
export const appRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
