import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Option } from 'src/types';
import { PublicUser } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly auth: AuthService) {
    super();
  }

  public async validate(
    username: string,
    password: string,
  ): Promise<Option<PublicUser>> {
    return await this.auth.validateUser(username, password);
  }
}
