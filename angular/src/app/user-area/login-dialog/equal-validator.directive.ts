import { Directive, forwardRef, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidatorDirective), multi: true },
    ],
})
export class EqualValidatorDirective implements Validator {

    @Input('validateEqual') public validateEqual: string;
    @Input('reverse') public reverse: string;

    private get isReverse(): boolean {
        if (!this.reverse) {
            return false;
        }
        return this.reverse === 'true' ? true : false;
    }

    validate(control: AbstractControl): { [key: string]: any } {
        // self value
        let inputValue: string = control.value;

        // control value
        let controlValue: AbstractControl = control.root.get(this.validateEqual);

        // value not equal
        if (controlValue && inputValue !== controlValue.value && !this.isReverse) {
          return {
            validateEqual: false,
          };
        }

        // value equal and reverse
        if (controlValue && inputValue === controlValue.value && this.isReverse) {
            delete controlValue.errors.validateEqual;
            if (!Object.keys(controlValue.errors).length) {
                controlValue.setErrors(undefined);
            }
        }

        // value not equal and reverse
        if (controlValue && inputValue !== controlValue.value && this.isReverse) {
            controlValue.setErrors({
                validateEqual: false,
            });
        }

        return undefined;
    }
}
