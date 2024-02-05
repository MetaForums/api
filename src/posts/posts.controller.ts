import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { ParamGetNumber } from 'src/decorators/paramGetNumber';
import { ExpressReq, Option } from 'src/types';
import { UpdatePostDto } from './update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly posts: PostsService) {}

  @Get(':id')
  async getPost(@ParamGetNumber('id') id: Option<number>) {
    return this.posts.getPost(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @ParamGetNumber('id') id: Option<number>,
    @Request() request: ExpressReq,
    @Body() body: UpdatePostDto,
  ) {
    return this.posts.updatePost(id, body.content, request.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deletePost(
    @ParamGetNumber('id') id: Option<number>,
    @Request() request: ExpressReq,
  ) {
    return this.posts.deletePost(id, request.user);
  }
}
