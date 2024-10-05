export class ApiResponse<TData> {
  statusCode: number;
  message: string;
  data: TData;
  success: boolean;

  constructor(statusCode: number, data: TData, message = 'Success') {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}
