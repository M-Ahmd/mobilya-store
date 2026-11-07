import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomOrderDto } from './create-custom-order.dto.js';
import { IsOptional, IsNumber, IsEnum } from 'class-validator';
import { CustomOrderStatus } from '@prisma/client'; 

export class UpdateCustomOrderDto extends PartialType(CreateCustomOrderDto) {
  
  @IsOptional()
  @IsNumber() 
  adminId?: number;

  @IsOptional()
  @IsNumber()
  quotePrice?: number;

  @IsOptional()
  @IsEnum(CustomOrderStatus)
  status?: CustomOrderStatus; 
}