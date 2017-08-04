import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssistantsValidatorDirective } from './directives/assistant-validator.directive';
import { EmailValidatorDirective } from './directives/email-validator.directive';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    EmailValidatorDirective,
    AssistantsValidatorDirective,
  ],
  exports: [
    EmailValidatorDirective,
    AssistantsValidatorDirective,
    CommonModule,
  ],
})

export class SharedModule { }
