import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';

export const GetUser = createParamDecorator(
  (_: unknown, context: ExecutionContext): IUser => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
