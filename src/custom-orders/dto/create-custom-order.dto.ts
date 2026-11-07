import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateCustomOrderDto {
  @ApiProperty({
    description: 'Detailed description of the custom order request',
    example: '3x3 velvet corner sofa in navy blue',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    description: 'Dimensions or measurements of the custom piece',
    example: '300x300 cm',
  })
  @IsString()
  @IsOptional()
  dimensions?: string;

  @ApiPropertyOptional({
    description: 'URL or path to an uploaded reference design image',
    example: 'https://example.com/images/sofa-design.jpg',
  })
  @IsString()
  @IsOptional()
  referenceImage?: string;

  @ApiProperty({
    description: 'The unique ID of the customer placing the order',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  customerId: number;
}
