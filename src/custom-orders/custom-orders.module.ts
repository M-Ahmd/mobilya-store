import { Module } from '@nestjs/common';
import { CustomOrdersService } from './custom-orders.service.js';
import { CustomOrdersController } from './custom-orders.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
@Module({
  imports : [PrismaModule],
  controllers: [CustomOrdersController],
  providers: [CustomOrdersService],
})
export class CustomOrdersModule {}
