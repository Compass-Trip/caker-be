import { Module } from '@nestjs/common';
import { ProductsService } from './domain/products.service';
import { ProductsController } from './presentation/products.controller';
import { ThemeNDesignCategoriesRepositoryImpl } from './infrastructures/theme-n-design-categories.repository';
import { THEME_N_DESIGN_CATEGORIES } from './domain/theme-n-design-categories.repository.interface';
import { EVENT_CATEGORIES } from './domain/event-categories.repository.interface';
import { EventCategoriesRepositoryImpl } from './infrastructures/event-categories.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    ProductsService,
    {
      provide: THEME_N_DESIGN_CATEGORIES,
      useClass: ThemeNDesignCategoriesRepositoryImpl,
    },
    {
      provide: EVENT_CATEGORIES,
      useClass: EventCategoriesRepositoryImpl,
    },
  ],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
