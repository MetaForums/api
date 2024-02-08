import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Post, User } from '@prisma/client';
import {
  POST_CANNOT_UPDATE_NOT_AUTHOR,
  POST_ID_NOT_FOUND,
  POST_ID_NOT_VALID,
} from 'src/constants';
import { PrismaService } from 'src/services/prisma.service';
import { Option } from 'src/types';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  public async getPost(id?: number): Promise<Post> {
    if (!id) throw new BadRequestException(POST_ID_NOT_VALID);

    const post = await this.prisma.post.findUnique({
      where: { id },
    });
    if (!post) throw new NotFoundException(POST_ID_NOT_FOUND);

    return post;
  }

  public async createPost(
    threadId: number,
    content: string,
    author: User,
    replyId?: number,
  ) {
    return await this.prisma.post.create({
      data: {
        threadId,
        content,
        authorId: author.id,
        replyPostId: replyId,
      },
    });
  }

  public async updatePost(
    id: Option<number>,
    content: string,
    user: User,
  ): Promise<Post> {
    const post = await this.getPost(id);
    if (post.authorId !== user.id)
      throw new BadRequestException(POST_CANNOT_UPDATE_NOT_AUTHOR);
    return await this.prisma.post.update({
      where: { id },
      data: { content, isEdited: true },
    });
  }

  public async deletePost(id: Option<number>, user: User) {
    const post = await this.getPost(id);
    if (post.authorId !== user.id)
      throw new BadRequestException(POST_CANNOT_UPDATE_NOT_AUTHOR);
    return await this.prisma.post.update({
      where: { id },
      data: { isDeleted: true, content: '' },
    });
  }

  public async getPosts(
    threadId: number,
    page: number = 1,
    count: number = 10,
  ) {
    return await this.prisma.post.findMany({
      where: { threadId },
      skip: (page - 1) * count,
      take: count,
      orderBy: { createdAt: 'asc' },
      include: {
        author: true,
        thread: true,
      },
    });
  }
}
