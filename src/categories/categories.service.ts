import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from '@prisma/client';
import { CATEGORY_ID_NOT_VALID } from 'src/constants';
import { PrismaService } from 'src/services/prisma.service';
import { Option } from 'src/types';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  public async getCategories(page: number = 1, count: number = 10) {
    return await this.prisma.category.findMany({
      skip: (page - 1) * count,
      take: count,
    });
  }

  public async getCategory(id?: number): Promise<Option<Category>> {
    if (!id) throw new BadRequestException(CATEGORY_ID_NOT_VALID);

    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) throw new NotFoundException(CATEGORY_ID_NOT_VALID);

    return category;
  }
}
