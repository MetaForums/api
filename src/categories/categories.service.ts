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

  public async getCategories() {
    return await this.prisma.category.findMany();
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
