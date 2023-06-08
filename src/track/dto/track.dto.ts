import { IsString } from "class-validator";

export class TrackDto {
  @IsString()
  _id: string;
  @IsString()
  name: string;
  @IsString()
  artist: string;
  @IsString()
  audio: string;
  @IsString()
  picture: string;
}
