export declare class SuccessResponseDto<T = any> {
    success: boolean;
    message: string;
    data?: T;
    constructor(message: string, data?: T);
}
export declare class ErrorResponseDto {
    success: boolean;
    message: string;
    error?: string;
    statusCode?: number;
    errors?: string[];
    constructor(message: string, error?: string, statusCode?: number, errors?: string[]);
}
