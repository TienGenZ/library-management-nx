import { HttpException, HttpStatus } from '@nestjs/common';

export type HttpError = {
  statusCode: HttpStatus;
  message: string | string[];
  description?: string;
  errorCode?: string;
};

export class ApiError extends HttpException {
  cause: Error;

  constructor(httpError: HttpError, cause?: Error) {
    const { statusCode, ...rest } = httpError;
    super(rest, statusCode);
    this.name = 'ApiError';
    this.cause = cause;

    if (!cause) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}
