import { HttpStatus } from "../models/enums/common/http-enums.js";

class BaseError extends Error {
  public readonly name: string;
  public readonly isOperational: boolean;
  public readonly statusCode: HttpStatus;

  constructor(message: string, statusCode = HttpStatus.InternalServerError, isOperational = true) {
    super(message);
    this.name = this.constructor.name;
    this.isOperational = isOperational;
    this.statusCode = statusCode;

    // To maintain the correct stack trace in V8 (Node.js)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default BaseError;
