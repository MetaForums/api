import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PrismaService } from 'src/services/prisma.service';
import { PostsController } from './posts.controller';

@Module({
  controllers: [PostsController],
  providers: [PrismaService, PostsService],
  exports: [],
})
export class PostsModule {}
