import { ObjectId } from 'mongoose';

export class AddGenreDto {
  readonly trackId: ObjectId;
  readonly genres: ObjectId[];
}
