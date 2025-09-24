import * as bcrypt from 'bcrypt';
import { Global, Injectable } from '@nestjs/common';

@Global()
@Injectable()
export class PasswordEncoder {
	private static readonly SALT_ROUNDS = 12;

	async encode(password: string): Promise<{ password: string, salt: string }> {
		const salt = bcrypt.genSaltSync(PasswordEncoder.SALT_ROUNDS);
		const passwordHash = await bcrypt.hash(password, salt);
		return { password: passwordHash, salt };
	}
	async authenticate(password: string, salt: string, hash: string): Promise<boolean> {
		const newHash = await bcrypt.hash(password, salt);
		return hash == newHash;
	}
}