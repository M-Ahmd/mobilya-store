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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CustomOrdersService } from './custom-orders.service.js';
import { CreateCustomOrderDto } from './dto/create-custom-order.dto.js';
import { UpdateCustomOrderDto } from './dto/update-custom-order.dto.js';

@ApiTags('custom-orders')
@Controller('custom-orders')
export class CustomOrdersController {
  constructor(private readonly customOrdersService: CustomOrdersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new custom order',
    description: 'Creates a custom order linked to an existing customer.',
  })
  @ApiCreatedResponse({
    description: 'The custom order has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Validation failed or foreign key violation.',
  })
  @ApiNotFoundResponse({
    description: 'Customer with the specified customerId does not exist.',
  })
  create(@Body() createCustomOrderDto: CreateCustomOrderDto) {
    return this.customOrdersService.create(createCustomOrderDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve all custom orders',
    description: 'Returns a list of all custom orders including customer profile and handling admin details.',
  })
  @ApiOkResponse({
    description: 'List of custom orders retrieved successfully.',
  })
  findAll() {
    return this.customOrdersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve a single custom order by ID',
    description: 'Finds an existing custom order by its unique UUID.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'UUID of the custom order',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @ApiOkResponse({
    description: 'The custom order details.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid UUID format provided.',
  })
  @ApiNotFoundResponse({
    description: 'Custom order not found.',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.customOrdersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a custom order',
    description: 'Updates custom order details, admin assignment, price quote, or progression status.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'UUID of the custom order to update',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @ApiOkResponse({
    description: 'The custom order has been successfully updated.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid UUID format or invalid body payload.',
  })
  @ApiNotFoundResponse({
    description: 'Custom order, customer, or admin was not found.',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCustomOrderDto: UpdateCustomOrderDto,
  ) {
    return this.customOrdersService.update(id, updateCustomOrderDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a custom order',
    description: 'Deletes a custom order permanently by its UUID.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'UUID of the custom order to delete',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @ApiOkResponse({
    description: 'The custom order has been successfully deleted.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid UUID format.',
  })
  @ApiNotFoundResponse({
    description: 'Custom order not found.',
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.customOrdersService.remove(id);
  }
}
