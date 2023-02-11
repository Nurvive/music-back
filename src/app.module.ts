import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumController } from './album/album.controller';
import { AlbumService } from './album/album.service';
import { AlbumModule } from './album/album.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://Nurvive:80afenon@cluster0.smakqvv.mongodb.net/?retryWrites=true&w=majority',
    ),
    TrackModule,
    AlbumModule,
    FileModule,
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AppModule {}
