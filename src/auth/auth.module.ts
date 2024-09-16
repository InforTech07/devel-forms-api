import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: '!#secretKey',
            signOptions: { expiresIn: '1d' },
        })
    ],
    providers: [AuthService, JwtStrategy],
    controllers:[AuthController]
})
export class AuthModule {}
