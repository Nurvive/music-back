import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TrackDto } from '../../track/dto/track.dto';
import * as mongoose from "mongoose";

export type PlaylistDocument = HydratedDocument<Playlist>;

@Schema()
export class Playlist {
  @Prop({ required: true })
  name: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }] })
  tracks: TrackDto[];
  @Prop({ required: true })
  author: string;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
