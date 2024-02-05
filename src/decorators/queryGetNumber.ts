import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const QueryGetNumber = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const value = request.query[data];
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? undefined : parsed;
  },
);
