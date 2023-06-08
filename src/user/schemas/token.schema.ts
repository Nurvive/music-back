import { Prop, Schema } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema()
export class Token {
  @Prop({ required: true })
  refreshToken: string;

  @Prop({ ref: 'User' })
  user: ObjectId;
}
