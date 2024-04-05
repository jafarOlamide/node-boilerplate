import { ResponseStatusCodes } from "./ApiResponse.js";

const ErrorType = Object.freeze({
    BAD_TOKEN:        "BadTokenError",
    UNAUTHORIZED:     "AuthFailureError",
    INTERNAL:         "InternalError",
    NOT_FOUND:        "NotFoundError",
    NO_ENTRY:         "NoEntryError",
    BAD_REQUEST:      "BadRequestError",
    FORBIDDEN:        "ForbiddenError",
})


export class CustomErrors extends Error {
    constructor(statusCode ,type, message) {
        super(message);
        this.name = "CustomErrors";
        this.statusCode = statusCode;
        this.type = type;
    }
}

export class AuthFailureError extends CustomErrors {
    constructor(message = "Invalid Credentials") {
      super(ResponseStatusCodes.UNAUTHORIZED, ErrorType.UNAUTHORIZED,message);
      this.name = "AuthFailureError";
    }
}
  
export class InternalError extends CustomErrors {
    constructor(message = "Internal Error") {
      super(ResponseStatusCodes.INTERNAL_ERROR, ErrorType.INTERNAL, message);
      this.name = "InternalError";
    }
}
  
export class BadRequestError extends CustomErrors {
    constructor(message = "Bad Request") {
        super(ResponseStatusCodes.BAD_REQUEST, ErrorType.BAD_REQUEST, message);
        this.name = "BadRequestError";
    }
}

export class NotFoundError extends CustomErrors {
    constructor(message = "Not Found") {
        super(ResponseStatusCodes.NOT_FOUND, ErrorType.NOT_FOUND,message);
        this.name = "NotFoundError";
    }
}

export class NoDataError extends CustomErrors {
    constructor(message = "No data available") {
      super(ResponseStatusCodes.UNPROCESSABLE_ENTITY, ErrorType.NO_DATA, message);
    }
  }

export class BadTokenError extends CustomErrors {
    constructor(message = "Token is not valid") {
      super(ResponseStatusCodes.UNAUTHORIZED, ErrorType.BAD_TOKEN, message);
    }
  }

export class ForbiddenError extends CustomErrors {
    constructor(message = "Permission Denied!") {
        super(ResponseStatusCodes.FORBIDDEN,ErrorType.FORBIDDEN, message);
        this.name = "ForbiddenError";
    }
}

