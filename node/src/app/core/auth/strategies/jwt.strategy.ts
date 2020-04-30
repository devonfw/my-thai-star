import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@devon4node/config';
import { UserPayload } from '../../user/model/dto/user-payload.dto';
import { Config } from '../../../shared/model/config/config.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(public readonly configService: ConfigService<Config>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.values.jwtConfig.secret,
    });
  }

  async validate(payload: UserPayload): Promise<UserPayload> {
    return payload;
  }
}
