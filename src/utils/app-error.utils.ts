export class AppError extends Error {
  public httpCode: number;
  public errors: string[] | { label: string; message: string }[] | undefined;
  public status: string;
  public readonly isOperational: boolean;

  constructor(
    httpCode: number,
    message: string,
    errors?: string[] | { label: string; message: string }[]
  ) {
    super(message);
    this.status = httpCode >= 400 && httpCode < 500 ? "fail" : "error";
    this.httpCode = httpCode;
    this.errors = errors || [];
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
