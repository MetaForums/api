import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserData } from '@prisma/client';
import { SignUpDto } from 'src/users/signup.dto';
import { USER_NOT_FOUND, USER_USERNAME_EXISTS } from 'src/constants';
import { PrismaService } from 'src/services/prisma.service';
import { Option } from 'src/types';
import { hash } from 'bcrypt';

export type UserIData = User & {
  data: UserData;
};

// export type User = PrismaUser & {
//   posts: Post[];
//   threads: Thread[];
// };
// export type PublicUser = Omit<User, 'passwordHash' | 'email'>;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  public async findOne<WhereT extends 'username' | 'id'>(
    where: WhereT,
    data: WhereT extends 'username' ? string : number,
  ): Promise<Option<UserIData>> {
    return await this.prisma.user.findUnique({
      where: {
        username: where === 'username' ? (data as string) : undefined,
        id: where === 'id' ? (data as number) : undefined,
      },
      include: {
        posts: {
          take: 5,
        },
        threads: {
          take: 5,
        },
        data: true,
      },
    });
  }

  public async findUser(userId: number): Promise<Option<User>> {
    const user = await this.findOne('id', userId);
    if (!user) throw new NotFoundException(USER_NOT_FOUND);
    return user;
  }

  public async createUser({
    username,
    displayName,
    password,
    email,
  }: SignUpDto): Promise<User> {
    if (await this.findOne('username', username))
      throw new ConflictException(USER_USERNAME_EXISTS);

    const user = await this.prisma.user.create({
      data: {
        username,
        displayName,
        // passwordHash: await hash(password, 10),
        // email,
        role: 'USER',
      },
    });

    await this.prisma.userData.create({
      data: {
        userId: user.id,
        email,
        passwordHash: await hash(password, 10),
      },
    });

    return await this.findUser(user.id);
  }
}
