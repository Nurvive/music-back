import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Playlist, PlaylistSchema } from './schemas/playlist.schema';
import { TrackModule } from "../track/track.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Playlist.name,
        schema: PlaylistSchema,
      },
    ]),
    TrackModule
  ],
  providers: [PlaylistService],
  controllers: [PlaylistController],
  exports: [PlaylistService],
})
export class PlaylistModule {}
