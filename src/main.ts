import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
// import cookieSession from 'cookie-session';
const CookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(CookieSession({ keys: ['qwewer'] }));
  app.useGlobalPipes(
    // used for security so that additional
    //  property will nit be add to the request
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
