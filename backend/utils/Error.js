export class AppError extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.status = String(statusCode).startsWith(4) ? "fail" : "error";
    this.isOpertational = true; //telling us that the error is trusted
    this.statusCode = statusCode;
  }
}
