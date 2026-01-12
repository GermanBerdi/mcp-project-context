import BaseError from "./base-error.js";

import { HttpStatus } from "../models/enums/common/http-enums.js";

class NotFoundError extends BaseError {
  constructor(message = "Resource not found") {
    super(message, HttpStatus.NotFound);
  }
}

export default NotFoundError;
