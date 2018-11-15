import { ArgumentsHost, HttpStatus, ExceptionFilter } from '@nestjs/common';
import { AppModule } from 'app.module';
export class HttpExceptionFilter implements ExceptionFilter {
  private log: string;
  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    this.log = '';
    if (error.getStatus() === HttpStatus.UNAUTHORIZED) {
      if (typeof error.response !== 'string') {
        error.response.message =
          error.response.message ||
          'You do not have permission to proceeed with this operation';
      }
    }
    res.status(error.getStatus()).json({
      statusCode: error.getStatus(),
      error: error.response.name || error.name,
      message: error.response.message || error.message,
      timestamp: new Date().toISOString(),
      path: req ? req.url : null,
    });
    this.log = `params: ${JSON.stringify(req.body)} headers: ${JSON.stringify(
      req.headers,
    )} url: ${req.url} response: ${error.response.message} StackTrace: ${
      error.stack
    }`;
    AppModule.logger.log('error', this.log);
  }
}
