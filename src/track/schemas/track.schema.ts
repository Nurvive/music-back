import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Genre } from './genre.schema';
import { HydratedDocument } from "mongoose";

export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {
  @Prop()
  name: string;
  @Prop()
  artist: string;
  @Prop()
  listenCount: number;
  @Prop()
  audio: string;
  @Prop()
  picture: string;
  @Prop()
  genres: Genre[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
