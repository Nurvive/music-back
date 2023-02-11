import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 5001;
const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(PORT, () => console.log(`Server started ${PORT}`));
  } catch (e) {
    console.error(e);
  }
};

void start();
