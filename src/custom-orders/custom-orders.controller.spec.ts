import { Test, TestingModule } from '@nestjs/testing';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import { CustomOrdersController } from './custom-orders.controller.js';
import { CustomOrdersService } from './custom-orders.service.js';

describe('CustomOrdersController', () => {
  let controller: CustomOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomOrdersController],
      providers: [
        {
          provide: CustomOrdersService,
          useValue: {
            create: vi.fn(),
            findAll: vi.fn(),
            findOne: vi.fn(),
            update: vi.fn(),
            remove: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CustomOrdersController>(CustomOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
