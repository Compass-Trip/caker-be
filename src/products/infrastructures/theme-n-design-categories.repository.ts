import { Injectable } from '@nestjs/common';
import { IThemeNDesignCategoriesRepository } from '../domain/theme-n-design-categories.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { ThemeNDesignCategories } from '@prisma/client';

@Injectable()
export class ThemeNDesignCategoriesRepositoryImpl
  implements IThemeNDesignCategoriesRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ThemeNDesignCategories[]> {
    return await this.prisma.themeNDesignCategories.findMany();
  }
}
