import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Genres } from "../track.constants";

export type GenreDocument = HydratedDocument<Genre>;

@Schema()
export class Genre {
  @Prop()
  name: Genres;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
