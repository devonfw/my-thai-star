import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'management/user/models/user-role.enum';
import { User } from 'management/user/models/user.entity';
import { EnumToArray } from '../utilities/to-array';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this._reflector.get<UserRole[]>(
      'roles',
      context.getHandler(),
    );

    if (!roles || roles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    const hasRole = () => EnumToArray(UserRole).indexOf(user.role) >= 0;

    if (user && user.role && hasRole()) {
      return true;
    }

    throw new HttpException(
      'You do not have permission to proceed',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
