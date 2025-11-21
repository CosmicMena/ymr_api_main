import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export interface CurrentUserInterface {
  userId: string;
  email: string;
  userType: 'user' | 'admin';
  role?: string;
  permissions?: string[];
}