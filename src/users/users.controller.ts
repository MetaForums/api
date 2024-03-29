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
import { ParamGetNumber } from 'src/decorators/paramGetNumber';
import { Option } from 'src/types';

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

  @Get(':id')
  async getUser(@ParamGetNumber('id') id: Option<number>) {
    return await this.user.findUser(id);
  }
}
