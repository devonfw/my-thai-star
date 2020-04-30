import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/entities/user.entity';
import { UserService } from './services/user.service';
import { UserRole } from './model/entities/user-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole, User])],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
