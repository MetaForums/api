import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { PostsService } from 'src/posts/posts.service';

@Module({
  controllers: [ThreadsController],
  providers: [PrismaService, ThreadsService, PostsService],
})
export class ThreadsModule {}
