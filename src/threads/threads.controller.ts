import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ParamGetNumber } from 'src/decorators/paramGetNumber';
import { ExpressReq, Option } from 'src/types';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostsService } from 'src/posts/posts.service';
import { CreatePostDto } from './create-post.dto';
import { THREAD_LOCKED_NOT_ALLOWED } from 'src/constants';
import { QueryGetNumber } from 'src/decorators/queryGetNumber';

@Controller('threads')
export class ThreadsController {
  constructor(
    private readonly threads: ThreadsService,
    private readonly posts: PostsService,
  ) {}

  @Get(':id/posts')
  async getPosts(
    @ParamGetNumber('id') id: Option<number>,
    @QueryGetNumber('page') page: Option<number>,
    @QueryGetNumber('count') count: Option<number>,
  ) {
    return this.posts.getPosts(id, page, count);
  }

  @Get(':id')
  async getThread(@ParamGetNumber('id') id: Option<number>) {
    return this.threads.getThread(id);
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  async createPost(
    @ParamGetNumber('id') id: Option<number>,
    @Request() request: ExpressReq,
    @Body() body: CreatePostDto,
  ) {
    const thread = await this.threads.getThread(id);
    if (thread.isLocked && !['ADMIN', 'OWNER'].includes(request.user.role))
      throw new UnauthorizedException(THREAD_LOCKED_NOT_ALLOWED);
    return this.posts.createPost(id, body.content, request.user, body.replyId);
  }
}
