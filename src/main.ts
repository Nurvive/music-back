import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";

const PORT = 5001;
const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser())
    app.enableCors({
      origin: [new RegExp('localhost')],
      credentials: true
    });
    await app.listen(PORT, () => console.log(`Server started ${PORT}`));
  } catch (e) {
    console.error(e);
  }
};

void start();
