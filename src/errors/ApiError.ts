export interface ApiErrorType extends Error {
    message: string;
    status: number;
    errors?: string | string[] | null;
}

class ApiError extends Error {
    status: number;
    errors: string | string[] | null;
    constructor(
        message: string,
        status: number,
        errors: string | string[] | null = null
    ) {
        super(message);
        this.status = status;
        this.name = 'ApiError';
        this.errors = errors;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

export default ApiError;
