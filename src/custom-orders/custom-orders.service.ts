import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomOrderDto } from './dto/create-custom-order.dto.js';
import { UpdateCustomOrderDto } from './dto/update-custom-order.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CustomOrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomOrderDto: CreateCustomOrderDto) {
    const customer = await this.prisma.customer.findUnique({
      where: { userId: createCustomOrderDto.customerId },
    });

    if (!customer) {
      throw new NotFoundException(
        `Customer with ID ${createCustomOrderDto.customerId} not found`,
      );
    }

    return await this.prisma.customOrder.create({
      data: {
        description: createCustomOrderDto.description,
        dimensions: createCustomOrderDto.dimensions,
        customerId: createCustomOrderDto.customerId,
        referenceImage: createCustomOrderDto.referenceImage,
      },
    });
  }

  async findAll() {
    return await this.prisma.customOrder.findMany({
      include: {
        customer: {
          include: {
            user: true,
          },
        },
        admin: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const customOrder = await this.prisma.customOrder.findUnique({
      where: { id },
      include: {
        customer: {
          include: {
            user: true,
          },
        },
        admin: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!customOrder) {
      throw new NotFoundException(`Custom order with ID "${id}" not found`);
    }

    return customOrder;
  }

  async update(id: string, updateCustomOrderDto: UpdateCustomOrderDto) {
    await this.findOne(id);

    if (updateCustomOrderDto.customerId) {
      const customer = await this.prisma.customer.findUnique({
        where: { userId: updateCustomOrderDto.customerId },
      });
      if (!customer) {
        throw new NotFoundException(
          `Customer with ID ${updateCustomOrderDto.customerId} not found`,
        );
      }
    }

    if (updateCustomOrderDto.adminId) {
      const admin = await this.prisma.admin.findUnique({
        where: { userId: updateCustomOrderDto.adminId },
      });
      if (!admin) {
        throw new NotFoundException(
          `Admin with ID ${updateCustomOrderDto.adminId} not found`,
        );
      }
    }

    return await this.prisma.customOrder.update({
      where: { id },
      data: updateCustomOrderDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.prisma.customOrder.delete({
      where: { id },
    });
  }
}
