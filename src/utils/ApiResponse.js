
export const ResponseStatusCodes = Object.freeze({
    SUCCESS:                200,
    NO_CONTENT:             204,
    BAD_REQUEST:            400,
    UNAUTHORIZED:           401,
    FORBIDDEN:              403,
    NOT_FOUND:              404,
    UNPROCESSABLE_ENTITY:   422,
    INTERNAL_ERROR:         500,
})

export function successResponse(message, data) {
    return {
        responseCode: 200,
        message,
        data,
    };
}
  
export function errorResponse(responseCode = 400, message) {
    return {
        responseCode,
        message,
    };
}

