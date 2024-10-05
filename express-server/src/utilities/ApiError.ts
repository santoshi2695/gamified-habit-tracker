export class ApiError<TData = any, TError = any> extends Error {
  statusCode: number;
  message: string;
  data: TData | null;
  errors: TError[];
  success: boolean;
  stack: string = '';

  constructor(
    statusCode: number,
    message = 'Something went wrong',
    errors: TError[] = [],
    stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack.length > 0) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
      success: this.success,
      errors: this.errors,
    };
  }
}
