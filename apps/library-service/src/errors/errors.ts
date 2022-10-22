import { HttpStatus, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ApiError } from './api.error';

export function createError(services: string, e: Error): ApiError {
  Logger.error(e, e.stack);

  if (e instanceof ApiError) {
    return e;
  }

  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    // "Unique constraint failed on the {constraint}"
    if (e.code === 'P2002') {
      return new ApiError({
        statusCode: HttpStatus.CONFLICT,
        message: `${
          (e.meta as any)?.target ? `${(e.meta as any).target}` : `${services}`
        } already exists.`,
      });
    }
    // "An operation failed because it depends on one or more records that were required but not found. {cause}"
    if (e.code === 'P2025') {
      return new ApiError({
        statusCode: HttpStatus.NOT_FOUND,
        message: `${services} was not found`,
      });
    }
    //The change are make would violate the required relation between two models.
    if (e.code === 'P2014') {
      return new ApiError({
        statusCode: HttpStatus.METHOD_NOT_ALLOWED,
        message: `This ${services} has been assigned to an account`,
      });
    }
  }

  if (e.name === 'NotFoundError') {
    return new ApiError({
      statusCode: HttpStatus.NOT_FOUND,
      message: `${services} was not found`,
    });
  }

  return new ApiError({
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Internal server error',
  });
}
