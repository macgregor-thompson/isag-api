import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseController {
  public throwError(status: HttpStatus, message: string, error) {
    throw new HttpException(
      {
        status,
        error: message,
      },
      HttpStatus.NOT_FOUND,
      {
        cause: error,
      },
    );
  }
}
