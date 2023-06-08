import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, ObjectId } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: ObjectId;
  @Prop({ unique: true, required: true })
  name: string;
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
