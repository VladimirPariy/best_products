export class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(message: string, status: number) {
    super();
    this.status = status;
    this.message = message;
  }

  static forbidden(message?: string) {
    return new HttpException(message || 'Entering forbidden', 403);
  }

  static invalidToken(message?: string) {
    return new HttpException(message || 'Token is invalid', 403);
  }

  static unsuccessfulCreatingToken(message?: string) {
    return new HttpException(message || `Unsuccessful attempt to create token`, 500);
  }

  static invalidPass(message?: string) {
    return new HttpException(message || `User inputted invalid password`, 400);
  }

  static notFound(message: string) {
    return new HttpException(message, 404);
  }

  static alreadyExists(message: string) {
    return new HttpException(message, 409);
  }
}