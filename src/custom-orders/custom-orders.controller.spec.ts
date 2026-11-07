import { Test, TestingModule } from '@nestjs/testing';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';
import { CustomOrdersController } from './custom-orders.controller.js';
import { CustomOrdersService } from './custom-orders.service.js';
import { CreateCustomOrderDto } from './dto/create-custom-order.dto.js';
import { UpdateCustomOrderDto } from './dto/update-custom-order.dto.js';
import { CustomOrderStatus } from '@prisma/client';

describe('CustomOrdersController', () => {
  let controller: CustomOrdersController;

  const mockCustomOrder = {
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: '3x3 velvet corner sofa',
    dimensions: '300x300',
    referenceImage: 'https://example.com/sofa.jpg',
    status: CustomOrderStatus.PENDING,
    quotePrice: null,
    customerId: 1,
    adminId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCustomOrdersService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomOrdersController],
      providers: [
        {
          provide: CustomOrdersService,
          useValue: mockCustomOrdersService,
        },
      ],
    }).compile();

    controller = module.get<CustomOrdersController>(CustomOrdersController);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // ==========================================
  // POST /custom-orders (create)
  // ==========================================
  describe('create', () => {
    it('should create a custom order and return the created record', async () => {
      const createDto: CreateCustomOrderDto = {
        description: '3x3 velvet corner sofa',
        dimensions: '300x300',
        referenceImage: 'https://example.com/sofa.jpg',
        customerId: 1,
      };

      mockCustomOrdersService.create.mockResolvedValue(mockCustomOrder);

      const result = await controller.create(createDto);

      expect(result).toEqual(mockCustomOrder);
      expect(mockCustomOrdersService.create).toHaveBeenCalledTimes(1);
      expect(mockCustomOrdersService.create).toHaveBeenCalledWith(createDto);
    });
  });

  // ==========================================
  // GET /custom-orders (findAll)
  // ==========================================
  describe('findAll', () => {
    it('should return an array of custom orders', async () => {
      const ordersList = [mockCustomOrder];
      mockCustomOrdersService.findAll.mockResolvedValue(ordersList);

      const result = await controller.findAll();

      expect(result).toEqual(ordersList);
      expect(mockCustomOrdersService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  // ==========================================
  // GET /custom-orders/:id (findOne)
  // ==========================================
  describe('findOne', () => {
    it('should return a single custom order by ID', async () => {
      const orderId = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
      mockCustomOrdersService.findOne.mockResolvedValue(mockCustomOrder);

      const result = await controller.findOne(orderId);

      expect(result).toEqual(mockCustomOrder);
      expect(mockCustomOrdersService.findOne).toHaveBeenCalledTimes(1);
      expect(mockCustomOrdersService.findOne).toHaveBeenCalledWith(orderId);
    });
  });

  // ==========================================
  // PATCH /custom-orders/:id (update)
  // ==========================================
  describe('update', () => {
    it('should update and return the updated custom order', async () => {
      const orderId = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
      const updateDto: UpdateCustomOrderDto = {
        adminId: 5,
        quotePrice: 15000,
        status: CustomOrderStatus.QUOTED,
      };

      const updatedOrder = Object.assign({}, mockCustomOrder, updateDto);

      mockCustomOrdersService.update.mockResolvedValue(updatedOrder);

      const result = await controller.update(orderId, updateDto);

      expect(result).toEqual(updatedOrder);
      expect(mockCustomOrdersService.update).toHaveBeenCalledTimes(1);
      expect(mockCustomOrdersService.update).toHaveBeenCalledWith(orderId, updateDto);
    });
  });

  // ==========================================
  // DELETE /custom-orders/:id (remove)
  // ==========================================
  describe('remove', () => {
    it('should remove the custom order and return the deleted record', async () => {
      const orderId = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
      mockCustomOrdersService.remove.mockResolvedValue(mockCustomOrder);

      const result = await controller.remove(orderId);

      expect(result).toEqual(mockCustomOrder);
      expect(mockCustomOrdersService.remove).toHaveBeenCalledTimes(1);
      expect(mockCustomOrdersService.remove).toHaveBeenCalledWith(orderId);
    });
  });
});
