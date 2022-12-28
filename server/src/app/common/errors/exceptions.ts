export class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(message: string, status: number) {
    super();
    this.status = status;
    this.message = message;
  }

  static forbidden(message: string) {
    return new HttpException(message, 403);
  }

  static internalServErr(message: string) {
    return new HttpException(message, 500);
  }

  static badRequest(message: string) {
    return new HttpException(message, 400);
  }

  static notFound(message: string) {
    return new HttpException(message, 404);
  }

  static alreadyExists(message: string) {
    return new HttpException(message, 409);
  }

  static unauthorized(message: string) {
    return new HttpException(message, 401);
  }
}
