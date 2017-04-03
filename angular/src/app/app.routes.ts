import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { BookTableComponent } from './book-table/book-table.component';

const routes: Routes = [
  { path: '',   redirectTo: '/restaurant', pathMatch: 'full' },
  {component: HomeComponent, path: 'restaurant'},
  {component: MenuComponent, path: 'menu'},
  {component: BookTableComponent, path: 'bookTable'}];

export const appRoutes: any = RouterModule.forRoot(routes);
