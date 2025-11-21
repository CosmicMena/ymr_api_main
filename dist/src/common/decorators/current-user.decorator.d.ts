export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
export interface CurrentUserInterface {
    userId: string;
    email: string;
    userType: 'user' | 'admin';
    role?: string;
    permissions?: string[];
}
