import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ErrorMessage {
  message: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // 상태코드
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // 에러메시지
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error';

    const errorMessage =
      typeof message === 'string'
        ? message
        : (message as ErrorMessage).message || 'An unknown error Occurred!';

    // 커스텀 에러 응답형식
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: errorMessage,
      ...(process.env.NODE_ENV === 'development' && {
        stack: exception instanceof Error ? exception.stack : undefined,
      }),
    };

    // 로깅
    if (status >= 500) {
      this.logger.error(
        `Internal Server Error - ${request.method} ${request.url}`,
        exception instanceof Error ? exception.stack : 'No stack trace',
      );
    } else {
      this.logger.warn(
        `Client Error - ${request.method} ${request.url} - ${errorMessage}`,
      );
    }

    response.status(status).json(errorResponse);
  }
}
