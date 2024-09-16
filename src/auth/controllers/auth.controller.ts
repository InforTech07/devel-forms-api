import { Controller, Post, Request } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
//import { LocalAuthGuard } from '../guards/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //@UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const reqBody = req.body;
    return this.authService.login(reqBody);
  }
}
