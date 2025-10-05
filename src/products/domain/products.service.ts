import { Inject, Injectable } from '@nestjs/common';
import {
  IThemeNDesignCategoriesRepository,
  THEME_N_DESIGN_CATEGORIES,
} from './theme-n-design-categories.repository.interface';
import {
  EVENT_CATEGORIES,
  IEventCategoriesRepository,
} from './event-categories.repository.interface';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(THEME_N_DESIGN_CATEGORIES)
    private readonly themeNDesignCategoriesRepository: IThemeNDesignCategoriesRepository,
    @Inject(EVENT_CATEGORIES)
    private readonly eventCategoriesRepository: IEventCategoriesRepository,
  ) {}

  async getAllEventCategories() {
    return await this.eventCategoriesRepository.findAll();
  }

  async getAllThemeNDesginCategories() {
    return await this.themeNDesignCategoriesRepository.findAll();
  }
}
