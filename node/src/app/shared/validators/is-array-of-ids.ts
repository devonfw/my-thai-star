import {
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isArrayOfIds' })
export class IsArrayOfIdsConstraint implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    return (
      Array.isArray(value) &&
      value.reduce((prev, curr) => {
        return prev && typeof Number(curr?.id) === 'number';
      }, true)
    );
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return validationArguments!.property + ' must be an array of ids';
  }
}

export function IsArrayOfIds() {
  return function(object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName,
      validator: IsArrayOfIdsConstraint,
    });
  };
}
