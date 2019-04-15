import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './container/home/home.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  { path: 'restaurant', component: HomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule {}
