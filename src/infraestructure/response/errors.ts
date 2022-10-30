import { ErrorData } from '../../domain/interficies/ErrorData';

export abstract class BaseError {
    public statusCode = 500;
    public statusText = 'Error';
    public bodyError: string | ErrorData[];

    constructor(bodyError: string | ErrorData[]) {
        this.bodyError = bodyError;
    }
}

export class InternalServerException extends BaseError {
    constructor(bodyError?: string) {
        super((bodyError ??= 'Internal server error'));

        this.statusText = 'Internal server error';
        this.statusCode = 500;
    }
}

export class InvalidRequestException extends BaseError {
    constructor(bodyError?: string | ErrorData[]) {
        super((bodyError ??= 'Invalid request'));

        this.statusText = 'Bad request';
        this.statusCode = 400;
    }
}