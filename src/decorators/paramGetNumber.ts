import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ParamGetNumber = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const value = request.params[data];
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? undefined : parsed;
  },
);
