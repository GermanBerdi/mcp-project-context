import BaseError from "./base-error.js";

import { HttpStatus } from "../models/enums/common/http-enums.js";

class ServiceError extends BaseError {
  constructor(message = "Service error") {
    super(message, HttpStatus.InternalServerError);
  }
}

export default ServiceError;
