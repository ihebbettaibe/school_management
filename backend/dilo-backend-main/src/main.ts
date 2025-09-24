import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import frontendRouter from './frontend-router';
import { HttpExceptionFilter, InternalExceptionFilter } from './common/filters';

async function bootstrap() {
    const port = parseInt(process.env.PORT ?? "8080");
    const host = process.env.HOST || 'localhost';

    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: [ 'http://localhost:3000', 'http://localhost:5173'],
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    });
    app.use(cookieParser());
    // app.use(frontendRouter);
    app.useGlobalFilters(new HttpExceptionFilter(), new InternalExceptionFilter());
    await app.listen(port);

    console.log(`
==============================================================
          Server running on: http://${host}:${port}/
      OpenAPI Specification: http://${host}:${port}/docs
==============================================================
`);
}
bootstrap();
