import {
  HttpException,
  HttpStatus,
  ExceptionFilter,
  Catch,
  ArgumentsHost,
} from '@nestjs/common';
import { Request, Response } from 'express';

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}

export class NotFoundException extends HttpException {
  constructor(
    message = "Oops....can't seem to find what you are looking for.",
  ) {
    super(message, HttpStatus.NOT_FOUND);
  }
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
