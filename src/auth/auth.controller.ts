import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ExpressReq } from 'src/types';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly user: UsersService,
    private readonly auth: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Request() request: ExpressReq) {
    return this.auth.login(request.user);
  }
}
