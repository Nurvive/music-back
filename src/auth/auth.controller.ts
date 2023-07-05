import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserReq } from './auth.types';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ValidateTokenDto } from './dto/validate-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() body: CreateUserDto, @Res() response: Response) {
    const createdUser = await this.usersService.create(body);

    const token = this.authService.generateJwtToken(createdUser);
    response.cookie('auth', token, {
      maxAge: 12000000,
      httpOnly: true,
      path: '/',
    });

    return response.send(createdUser);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: UserReq, @Res() response: Response) {
    const user = request.user;

    const token = this.authService.generateJwtToken(user);
    response.cookie('auth', token, {
      maxAge: 12000000,
      httpOnly: true,
      path: '/',
    });

    return response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Res() response: Response) {
    response.cookie('auth', '', {
      maxAge: 0,
      httpOnly: true,
      path: '/',
    });

    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Req() request: UserReq) {
    const user = request.user;
    user.password = undefined;

    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('validate-token')
  async validateToken(@Body() body: ValidateTokenDto) {
    const data = await this.authService.validateToken(body.token);

    if (data?.name) {
      return { email: data.name };
    }

    throw new BadRequestException('Invalid token');
  }
}
