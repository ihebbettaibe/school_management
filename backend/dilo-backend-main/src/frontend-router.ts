import { Router, static as expressStatic } from 'express';
import * as swaggerUI from 'swagger-ui-express';
import * as yaml from 'yamljs';
import * as fs from 'fs';
import * as path from 'path';

const customCss = fs.readFileSync(path.join(process.cwd(),'resources','swagger-ui.css'),'utf8');

const doc = yaml.load('./api.yaml');
const router = Router();

router.use('/docs', swaggerUI.serve, swaggerUI.setup(doc, { customCss }));

export default router;