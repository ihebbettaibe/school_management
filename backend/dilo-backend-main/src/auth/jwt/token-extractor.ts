import { HEADER_AUTH_TOKEN } from '../../common';
import { Request } from 'express';

export const tokenExtractor = (req: Request): string | null => {
	if (req?.cookies && req.cookies[HEADER_AUTH_TOKEN]) return req.cookies[HEADER_AUTH_TOKEN];
	if (req?.headers && req.headers.authorization) {
		const parts = req.headers.authorization.split(' ');
		if (parts.length === 2 && parts[0] === 'Bearer') return parts[1];
	}
	return null;
}