import { Response, Request } from 'express';
import { HttpExceptionFilter } from './http-exception.filter';
import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;
  let mockResponse: Partial<Response> & { status: jest.Mock; json: jest.Mock };
  let mockRequest: Partial<Request>;
  let mockArgumentHost: ArgumentsHost;

  beforeEach(() => {
    filter = new HttpExceptionFilter();

    // Response 모킹
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    // Request 모킹
    mockRequest = {
      url: '/api/test',
      method: 'GET',
    };

    // ArgumentsHost 모킹
    mockArgumentHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
      getArgByIndex: jest.fn(),
      getArgs: jest.fn(),
      getType: jest.fn(),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn(),
    };

    // Logger 모킹
    jest.spyOn(filter['logger'], 'error').mockImplementation();
    jest.spyOn(filter['logger'], 'warn').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });
  describe('400번대 에러 처리', () => {
    it('400 Bad Request 에러의 경우 warn 로깅이 발생해야한다.', () => {
      // given
      const exception = new HttpException(
        'Bad Request',
        HttpStatus.BAD_REQUEST,
      );

      // when
      filter.catch(exception, mockArgumentHost);

      // then
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 400,
          message: 'Bad Request',
          path: '/api/test',
          method: 'GET',
          timestamp: expect.stringMatching(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
          ),
        } as Record<string, unknown>),
      );

      expect(filter['logger'].warn).toHaveBeenCalledWith(
        expect.stringContaining('Client Error - GET /api/test - Bad Request'),
      );

      const jsonCall = (mockResponse.json as jest.Mock).mock.calls[0][0];
      expect(jsonCall.timestamp).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      );
    });
    it('400번대 에러이면서 복잡한 에러 메시지 객체의 경우 warn 로깅이 발생해야한다.', () => {
      // given
      const errorResponse = {
        message: 'Validation failed',
        errors: ['email is invalid', 'password too short'],
      };
      const exception = new HttpException(
        errorResponse,
        HttpStatus.BAD_REQUEST,
      );

      // when
      filter.catch(exception, mockArgumentHost);

      // then
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(filter['logger'].warn).toHaveBeenCalledWith(
        expect.stringContaining(
          'Client Error - GET /api/test - Validation failed',
        ),
      );
    });
  });
  describe('500번대 에러처리', () => {
    it('500 Internal Server Error 에러의 경우 error 로깅이 발생해야한다.', () => {
      // given
      const exception = new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

      // when
      filter.catch(exception, mockArgumentHost);

      // then
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 500,
          message: 'Internal Server Error',
          path: '/api/test',
          method: 'GET',
        } as Record<string, unknown>),
      );
      expect(filter['logger'].error).toHaveBeenCalledWith(
        expect.stringContaining('Internal Server Error - GET /api/test'),
        expect.any(String),
      );
    });
    it('일반 Error 객체의 경우 500에러로 처리해야한다.', () => {
      // given
      const exception = new Error('Database connection failed');

      // when
      filter.catch(exception, mockArgumentHost);

      // then
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 500,
          message: 'Internal Server Error',
          path: '/api/test',
          method: 'GET',
        } as Record<string, unknown>),
      );
      expect(filter['logger'].error).toHaveBeenCalled();
    });
  });
  describe('스택트레이스 처리', () => {
    it('개발환경에서는 스택트레이스를 포함해야한다.', () => {
      // given
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      const exception = new Error('Test Error with Stack');

      // when
      filter.catch(exception, mockArgumentHost);

      // then
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({ stack: expect.any(String) } as Record<
          string,
          unknown
        >),
      );

      // clean up
      process.env.NODE_ENV = originalEnv;
    });
    it('운영환경에서는 스택트레이스를 포함하지 않는다.', () => {
      // given
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      const exception = new Error('Test Error');

      // when
      filter.catch(exception, mockArgumentHost);

      // then
      const jsonCall = (mockResponse.json as jest.Mock).mock.calls[0][0];
      expect(jsonCall).not.toHaveProperty('stack');

      // clean up
      process.env.NODE_ENV = originalEnv;
    });
  });
});
