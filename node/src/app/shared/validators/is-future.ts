import {
  ValidationOptions,
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

export function IsFuture(
  addHours?: number,
  validationOptions?: ValidationOptions,
) {
  // tslint:disable-next-line: only-arrow-functions
  return function(object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [addHours],
      validator: IsFutureConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'isFuture' })
export class IsFutureConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [addHours] = args.constraints;
    const now = new Date();

    if (addHours) {
      now.setHours(now.getHours() + addHours);
    }

    return value instanceof Date && value > now;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return validationArguments!.property + ' must be future';
  }
}
