import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { ThreadsService } from 'src/threads/threads.service';
import { PostsService } from 'src/posts/posts.service';

@Module({
  controllers: [CategoriesController],
  providers: [PrismaService, CategoriesService, ThreadsService, PostsService],
})
export class CategoriesModule {}
