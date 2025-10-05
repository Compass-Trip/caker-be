import { Injectable } from '@nestjs/common';
import { IEventCategoriesRepository } from '../domain/event-categories.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventCategories } from '@prisma/client';

@Injectable()
export class EventCategoriesRepositoryImpl
  implements IEventCategoriesRepository
{
  constructor(private readonly prisma: PrismaService) {}
  async findAll(): Promise<EventCategories[]> {
    return await this.prisma.eventCategories.findMany();
  }
}
