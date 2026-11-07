import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateCustomOrderDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  dimensions?: string;

  @IsString()
  @IsOptional()
  referenceImage?: string;

  @IsInt()
  @IsNotEmpty()
  customerId: number;
}
