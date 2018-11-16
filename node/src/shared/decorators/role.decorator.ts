import { ReflectMetadata } from '@nestjs/common';
import { UserRole } from 'management/user/models/user-role.enum';

export const Roles = (...roles: UserRole[]) => ReflectMetadata('roles', roles);
