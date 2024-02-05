import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Thread } from '@prisma/client';
import { THREAD_ID_NOT_FOUND, THREAD_ID_NOT_VALID } from 'src/constants';
import { PrismaService } from 'src/services/prisma.service';
import { PublicUser } from 'src/users/users.service';

@Injectable()
export class ThreadsService {
  constructor(private readonly prisma: PrismaService) {}

  public async getThread(id?: number): Promise<Thread> {
    if (!id) throw new BadRequestException(THREAD_ID_NOT_VALID);

    const thread = await this.prisma.thread.findUnique({
      where: { id },
    });
    if (!thread) throw new NotFoundException(THREAD_ID_NOT_FOUND);

    return thread;
  }

  public async getThreads(
    categoryId: number,
    page: number = 1,
    count: number = 10,
  ) {
    return await this.prisma.thread.findMany({
      where: { categoryId },
      skip: (page - 1) * count,
      take: count,
    });
  }

  public async createThread(
    categoryId: number,
    title: string,
    author: PublicUser,
  ): Promise<Thread> {
    return await this.prisma.thread.create({
      data: {
        categoryId,
        title,
        authorId: author.id,
      },
    });
  }
}
