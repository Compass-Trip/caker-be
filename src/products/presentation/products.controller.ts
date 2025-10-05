import { Controller, Get } from '@nestjs/common';
import { ProductsService } from '../domain/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get('/events')
  async getAllEventCategories() {
    return await this.service.getAllEventCategories();
  }

  @Get('/theme-and-design')
  async getAllThemeAndDesignCategories() {
    return await this.service.getAllThemeNDesginCategories();
  }
}
