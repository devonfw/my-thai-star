import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { InvalidUserException } from '../exceptions/invalid-user.exception';
import { Request, Response } from 'express';

@Catch(InvalidUserException)
export class InvalidUserFilter implements ExceptionFilter {
  catch(exception: InvalidUserException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = 401;

    response.status(status).json({
      error: exception.plainObject(),
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
