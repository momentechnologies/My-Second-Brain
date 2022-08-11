import ApiException, { errorResponse } from './apiException';

export const validationTypes = {
    INVALID_PARAMETER: 1,
    ALREADY_EXISTS: 2,
    NOT_FOUND: 3,
};

export const validationError = (
    key: string,
    message: string,
    uid: number = validationTypes.INVALID_PARAMETER
) => ({
    key,
    message,
    uid,
});

type ValidationErrorReturnType = ReturnType<typeof validationError>;

export default class ValidationException extends ApiException {
    errors: ValidationErrorReturnType[];

    constructor(
        errors: ValidationErrorReturnType | ValidationErrorReturnType[] = []
    ) {
        super('The request is not valid');
        this.shouldReport = false;

        if (Array.isArray(errors)) {
            this.errors = errors;
        } else {
            this.errors = [errors];
        }
    }

    getStatus() {
        return 422;
    }

    getBody() {
        return errorResponse(this.message, 'validation', {
            messages: this.errors,
        });
    }
}
