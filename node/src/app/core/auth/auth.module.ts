import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../../user/user.module';
import { ConfigurationModule } from '../configuration/configuration.module';
import { ConfigurationService } from '../configuration/configuration.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      useFactory: (config: ConfigurationService) => config.jwtConfig,
      inject: [ConfigurationService],
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
