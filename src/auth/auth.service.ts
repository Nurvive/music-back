import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(name: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.getOneByName(name);
      const isPasswordMatching = await bcrypt.compare(pass, user.password);

      if (!isPasswordMatching) {
        return null;
      }

      user.password = undefined;
      return user;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async login(user: User) {
    return {
      access_token: this.generateJwtToken(user),
    };
  }

  async validateToken(token: string): Promise<{ name: string }> {
    return await this.jwtService.verifyAsync<{ name: string }>(token, { ignoreExpiration: false }).catch((e) => {
      throw new BadRequestException(e.message);
    });
  }

  generateJwtToken(user: User) {
    const payload = { name: user.name, _id: user._id };

    return this.jwtService.sign(payload);
  }
}
