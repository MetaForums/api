import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './signup.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExpressReq } from 'src/types';

@Controller('users')
export class UsersController {
  constructor(private readonly user: UsersService) {}

  @Post('signup')
  async signUp(@Body() body: SignUpDto) {
    return await this.user.createUser(body);
  }

  @Get('@me')
  @UseGuards(JwtAuthGuard)
  async getAccount(@Request() request: ExpressReq) {
    return request.user;
  }
}
