import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CustomOrdersService } from './custom-orders.service.js';
import { CreateCustomOrderDto } from './dto/create-custom-order.dto.js';
import { UpdateCustomOrderDto } from './dto/update-custom-order.dto.js';

@Controller('custom-orders')
export class CustomOrdersController {
  constructor(private readonly customOrdersService: CustomOrdersService) {}

  @Post()
  create(@Body() createCustomOrderDto: CreateCustomOrderDto) {
    return this.customOrdersService.create(createCustomOrderDto);
  }

  @Get()
  findAll() {
    return this.customOrdersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.customOrdersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCustomOrderDto: UpdateCustomOrderDto,
  ) {
    return this.customOrdersService.update(id, updateCustomOrderDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.customOrdersService.remove(id);
  }
}
