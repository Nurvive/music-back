import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaylistController } from './playlist/playlist.controller';
import { PlaylistModule } from './playlist/playlist.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { TrackController } from './track/track.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const userName = configService.get('USER_NAME');
        const userPassword = configService.get('USER_PASSWORD');

        return {
          uri: `mongodb+srv://${userName}:${userPassword}@cluster0.smakqvv.mongodb.net/?retryWrites=true&w=majority`,
        };
      },
    }),
    TrackModule,
    PlaylistModule,
    FileModule,
    UsersModule,
  ],
  controllers: [PlaylistController, AuthController, TrackController],
})
export class AppModule {}
