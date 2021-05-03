import { MatExpansionModule } from '@angular/material/expansion';
import { AdminCockpitComponent } from './admin-cockpit.component';
import { NgModule } from '@angular/core';
import { TranslocoRootModule } from '../../transloco-root.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../../core/core.module';
import { AdminService } from './services/admin.service';
import { RegisterDialogComponent } from './components/register-dialog/register-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteUserDialogComponent } from './components/delete-user-dialog/delete-user-dialog.component';


@NgModule({
  declarations: [
    AdminCockpitComponent,
    RegisterDialogComponent,
    DeleteUserDialogComponent
  ],
  imports: [
    MatExpansionModule,
    TranslocoRootModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    CoreModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [
    AdminService
  ]
})
export class AdminCockpitModule { 
}
