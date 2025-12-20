class ApiError extends Error {
    constructor(message, status, errors = null) {
        super(message);
        this.status = status;
        this.name = 'ApiError';
        this.errors = errors;
    }
}

export default ApiError;
