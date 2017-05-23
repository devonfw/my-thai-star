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
    @Input('reverse') public reverse: string; // Remark: Please ducument this parameter or give it a better name.

    // Remark: Was it supposed to be a TS getter or simply isReverse method? Please revise and fix.
    private get isReverse(): boolean {
        return !!this.reverse && this.reverse === 'true';
    }

    validate(control: AbstractControl): { [key: string]: any } {

        // Remark - maybe like that? Please review.
        // const correlatedControl: AbstractControl = control.root.get(this.validateEqual);

        // if (!correlatedControl) {
        //     return undefined;
        // }

        // if (this.isReverse) {
        //     if (this.isValueEqual(control, correlatedControl)) {
        //         delete correlatedControl.errors.validateEqual;
        //         if (!Object.keys(correlatedControl.errors).length) {
        //             correlatedControl.setErrors(undefined);
        //         }
        //     } else {
        //         correlatedControl.setErrors({
        //             validateEqual: false,
        //         });
        //     }
        // }

        // return {
        //     validateEqual: this.isValueEqual(control, correlatedControl),
        // };

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

    // private isValueEqual(c1: AbstractControl, c2: AbstractControl): boolean {
    //     return c1.value === c2.value;
    // }
}
