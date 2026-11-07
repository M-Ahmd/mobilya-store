import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        const target =
          (exception.meta?.target as string[])?.join(', ') || 'field';
        response.status(status).json({
          statusCode: status,
          error: 'Conflict',
          message: `Unique constraint violation: ${target} already exists`,
        });
        break;
      }
      case 'P2003': {
        const status = HttpStatus.BAD_REQUEST;
        const field =
          typeof exception.meta?.field_name === 'string'
            ? exception.meta.field_name
            : 'foreign key';
        response.status(status).json({
          statusCode: status,
          error: 'Bad Request',
          message: `Foreign key constraint failed on ${field}`,
        });
        break;
      }
      case 'P2025': {
        const status = HttpStatus.NOT_FOUND;
        response.status(status).json({
          statusCode: status,
          error: 'Not Found',
          message: (exception.meta?.cause as string) || 'Record not found',
        });
        break;
      }
      default: {
        const status = HttpStatus.INTERNAL_SERVER_ERROR;
        response.status(status).json({
          statusCode: status,
          error: 'Internal Server Error',
          message: 'An unexpected database error occurred',
        });
        break;
      }
    }
  }
}
