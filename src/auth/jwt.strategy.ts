import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '!#secretKey',  // Utiliza la misma clave secreta definida en `JwtModule`
    });
  }

  async validate(payload: any) {
    return { userId: payload.id, email: payload.email };
  }
}
