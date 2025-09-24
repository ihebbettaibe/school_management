import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthSubject = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();
	return request.user;
});