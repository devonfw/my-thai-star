import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { BookTableComponent } from './book-table/book-table.component';
import { ReservationCockpitComponent } from './cockpit-area/reservation-cockpit/reservation-cockpit.component';
import { OrderCockpitComponent } from './cockpit-area/order-cockpit/order-cockpit.component';
import { AuthGuard } from './shared/authentication/auth-guard.service';
import { EmailConfirmationsComponent } from './email-confirmations/email-confirmations.component';

const routes: Routes = [
  { path: 'restaurant', component: HomeComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'bookTable', component: BookTableComponent},
  { path: 'orders', component: OrderCockpitComponent, canActivate: [AuthGuard]},
  { path: 'reservations', component: ReservationCockpitComponent, canActivate: [AuthGuard]},
  { path: 'booking/acceptInvite/:token', component: EmailConfirmationsComponent},
  { path: 'booking/rejectInvite/:token', component: EmailConfirmationsComponent},
  { path: 'booking/cancel/:token', component: EmailConfirmationsComponent},
  { path: 'booking/cancelOrder/:token', component: EmailConfirmationsComponent},
  { path: '**', redirectTo: '/restaurant', pathMatch: 'full' }];

export const appRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
