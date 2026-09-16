class ApiError extends Error {
    constructor (statusCode , massage) {
        super(massage);
        this.statusCode = statusCode;
        this.success = false;
    }
}

module.exports = ApiError