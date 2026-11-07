import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateCustomOrderDto } from './create-custom-order.dto.js';
import { IsOptional, IsNumber, IsEnum } from 'class-validator';
import { CustomOrderStatus } from '@prisma/client';

export class UpdateCustomOrderDto extends PartialType(CreateCustomOrderDto) {
  @ApiPropertyOptional({
    description: 'ID of the admin handling or pricing the custom order',
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  adminId?: number;

  @ApiPropertyOptional({
    description: 'Price quote proposed by the admin for the custom order',
    example: 15000,
  })
  @IsOptional()
  @IsNumber()
  quotePrice?: number;

  @ApiPropertyOptional({
    description: 'Current status of the custom order',
    enum: CustomOrderStatus,
    enumName: 'CustomOrderStatus',
    example: CustomOrderStatus.QUOTED,
  })
  @IsOptional()
  @IsEnum(CustomOrderStatus)
  status?: CustomOrderStatus;
}
