import { registerAs } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

export default registerAs('firebase', () => {
    const serviceAccountPath = path.join(process.cwd(), 'resources', 'firebase-credentials.json');
    if (!fs.existsSync(serviceAccountPath)) throw new Error('Firebase firebase-credentials.json not found!');

    return JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
});
