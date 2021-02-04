function ApiResponse(statusCode, data) {
    this.statusCode = statusCode;
    this.message = data;
}

module.exports = ApiResponse;