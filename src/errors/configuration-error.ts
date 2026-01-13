import BaseError from "./base-error.js";

import { HttpStatus } from "../models/enums/common/http-enums.js";

class ConfigurationError extends BaseError {
  constructor(message = "Configuration error") {
    super(message, HttpStatus.InternalServerError);
  }
}

export default ConfigurationError;
