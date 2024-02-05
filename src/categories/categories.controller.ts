import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { QueryGetNumber } from 'src/decorators/queryGetNumber';
import { ParamGetNumber } from 'src/decorators/paramGetNumber';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExpressReq, Option } from 'src/types';
import { CreateThreadDto } from './create-thread.dto';
import { ThreadsService } from 'src/threads/threads.service';
import {
  CATEGORY_ID_LOCKED_NOT_ALLOWED,
  CATEGORY_ID_NOT_FOUND,
} from 'src/constants';
import { PostsService } from 'src/posts/posts.service';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categories: CategoriesService,
    private readonly threads: ThreadsService,
    private readonly posts: PostsService,
  ) {}

  @Get()
  async getCategories(
    @QueryGetNumber('page') page: Option<number>,
    @QueryGetNumber('count') count: Option<number>,
  ) {
    return await this.categories.getCategories(page, count);
  }

  @Get(':id')
  async getCategory(@ParamGetNumber('id') id: Option<number>) {
    return await this.categories.getCategory(id);
  }

  @Get(':id/threads')
  async getThreads(
    @ParamGetNumber('id') id: Option<number>,
    @QueryGetNumber('page') page: Option<number>,
    @QueryGetNumber('count') count: Option<number>,
  ) {
    return await this.threads.getThreads(id, page, count);
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  async createThread(
    @Request() request: ExpressReq,
    @ParamGetNumber('id') id: Option<number>,
    @Body() body: CreateThreadDto,
  ) {
    const category = await this.categories.getCategory(id);
    if (!category) throw new NotFoundException(CATEGORY_ID_NOT_FOUND);
    if (category.isLocked && !['ADMIN', 'OWNER'].includes(request.user.role))
      throw new UnauthorizedException(CATEGORY_ID_LOCKED_NOT_ALLOWED);
    const createdThread = await this.threads.createThread(
      id,
      body.title,
      request.user,
    );
    return await this.posts.createPost(
      createdThread.id,
      body.content,
      request.user,
    );
  }
}
