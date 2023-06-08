import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create({ password, name }: CreateUserDto) {
    const foundUser = await this.getOneByName(name);

    if (foundUser) {
      throw new BadRequestException('User with that name already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await this.userModel.create({
      password: hashedPassword,
      name,
    });
    createdUser.password = undefined;

    return createdUser;
  }

  async getOneById(id: ObjectId): Promise<User> {
    return this.userModel.findById(id);
  }

  async getOneByName(name: string): Promise<User> {
    return this.userModel.findOne({ name });
  }
}
