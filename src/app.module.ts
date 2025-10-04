import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { StoresModule } from './stores/stores.module';
import { ProductsModule } from './products/products.module';
import { LikesModule } from './likes/likes.module';
import { CartsModule } from './carts/carts.module';
import { OrdersModule } from './orders/orders.module';
import { CustomServicesModule } from './custom-services/custom-services.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/http-exception/http-exception.filter';

@Module({
  imports: [
    UsersModule,
    CommonModule,
    AuthModule,
    TerminusModule,
    StoresModule,
    ProductsModule,
    LikesModule,
    CartsModule,
    OrdersModule,
    CustomServicesModule,
    PrismaModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
