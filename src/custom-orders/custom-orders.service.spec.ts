import { Test, TestingModule } from '@nestjs/testing';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';
import { CustomOrdersService } from './custom-orders.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CustomOrderStatus } from '@prisma/client';

describe('CustomOrdersService', () => {
  let service: CustomOrdersService;
  let prisma: PrismaService;

  // 1. Create mock Prisma service using Vitest's vi.fn()
  const mockPrismaService = {
    customer: {
      findUnique: vi.fn(),
    },
    admin: {
      findUnique: vi.fn(),
    },
    customOrder: {
      create: vi.fn(),
      update: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
      delete: vi.fn(),
    },
  };

  beforeEach(async () => {
    // 2. Build testing module and inject mock Prisma service
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomOrdersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CustomOrdersService>(CustomOrdersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    vi.clearAllMocks(); // Clear all mocks after each test
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ==========================================
  // Test 1: Customer creates a new order
  // ==========================================
  describe('create', () => {
    it('should create a new order successfully', async () => {
      // Arrange: Prepare test data
      const createDto = {
        description: '3x3 velvet corner sofa',
        dimensions: '300x300',
        customerId: 1, // Customer ID
      };
      const expectedResult = {
        id: 'uuid-123',
        ...createDto,
        status: CustomOrderStatus.PENDING,
        createdAt: new Date(),
      };

      // Mock customer existence check
      vi.spyOn(prisma.customer, 'findUnique').mockResolvedValue({ userId: 1 } as any);

      // Mock Prisma create return value
      vi.spyOn(prisma.customOrder, 'create').mockResolvedValue(expectedResult as any);

      // Act: Execute the function
      const result = await service.create(createDto);

      // Assert: Verify results and function calls
      expect(result).toEqual(expectedResult);
      expect(prisma.customOrder.create).toHaveBeenCalledTimes(1);
      expect(prisma.customOrder.create).toHaveBeenCalledWith({
        data: {
          description: createDto.description,
          dimensions: createDto.dimensions,
          customerId: createDto.customerId,
          referenceImage: undefined,
        },
      });
    });
  });

  // ==========================================
  // Test 2: Admin quotes the order
  // ==========================================
  describe('update (Admin Quote)', () => {
    it('should update the order with quote price and admin id', async () => {
      // Arrange: Prepare test data
      const orderId = 'uuid-123';
      const updateDto = {
        quotePrice: 15000,
        adminId: 5, // Admin ID who quoted
        status: CustomOrderStatus.QUOTED,
      };

      const expectedResult = {
        id: orderId,
        description: '3x3 velvet corner sofa',
        customerId: 1,
        ...updateDto,
      };

      // Mock order exists
      vi.spyOn(prisma.customOrder, 'findUnique').mockResolvedValue({ id: orderId } as any);
      // Mock admin exists
      vi.spyOn(prisma.admin, 'findUnique').mockResolvedValue({ userId: 5 } as any);
      // Mock update result
      vi.spyOn(prisma.customOrder, 'update').mockResolvedValue(expectedResult as any);

      // Act: Execute the function
      const result = await service.update(orderId, updateDto);

      // Assert: Verify results and function calls
      expect(result).toEqual(expectedResult);
      expect(prisma.customOrder.update).toHaveBeenCalledWith({
        where: { id: orderId },
        data: updateDto,
      });
    });
  });
});
