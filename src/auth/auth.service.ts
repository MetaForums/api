import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PublicUser, UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { Option } from 'src/types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  public async validateUser(
    username: string,
    password: string,
  ): Promise<Option<PublicUser>> {
    const user = await this.users.findOne('username', username);
    if (!user) throw new UnauthorizedException();
    if (!(await compare(password, user.passwordHash)))
      throw new UnauthorizedException();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { email, passwordHash, ...publicUser } = user;
    return publicUser;
  }

  public async login(user: PublicUser): Promise<{ access_token: string }> {
    return {
      access_token: await this.jwt.signAsync({
        sub: user.id,
        username: user.username,
      }),
    };
  }
}
