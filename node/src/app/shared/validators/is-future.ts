import {
  ValidationOptions,
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isFuture' })
export class IsFutureConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
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

export function IsFuture(addHours?: number, validationOptions?: ValidationOptions) {
  return function(object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [addHours],
      validator: IsFutureConstraint,
    });
  };
}
