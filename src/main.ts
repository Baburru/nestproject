import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from "helmet"

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())

  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        // Existing directives...
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`, 'trusted-cdn.com'],
      },
    },
    xssFilter: true, // Enable X-XSS-Protection header
  }));

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.DEV_PORT);
}
bootstrap();
