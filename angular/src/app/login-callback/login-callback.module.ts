import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';

import { LoginCallbackComponent } from './login-callback.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
  ],
  providers: [
  ],
  declarations: [
    LoginCallbackComponent,
  ],
  exports: [
    LoginCallbackComponent,
  ],
})
export class LoginCallbackModule { }
