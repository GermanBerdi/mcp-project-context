import BaseError from "./base-error.js";

import { HttpStatus } from "../models/enums/common/http-enums.js";

class HttpRequestError extends BaseError {
  constructor(message = "HTTP request error") {
    super(message, HttpStatus.BadGateway);
  }
}

export default HttpRequestError;
