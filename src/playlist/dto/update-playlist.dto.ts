import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class UpdatePlaylistDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsMongoId({ each: true })
  tracks?: ObjectId[]
}
