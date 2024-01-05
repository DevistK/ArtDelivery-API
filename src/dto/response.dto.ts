export class ResponseDto {
  statusCode: number;
  data: any;
  message: string;

  constructor(statusCode: number, data?: any, message?: string) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}
