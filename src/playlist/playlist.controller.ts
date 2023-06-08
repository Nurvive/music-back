import {
  Body,
  Controller, Delete,
  Get, HttpCode, HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards
} from "@nestjs/common";
import { PlaylistService } from './playlist.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserReq } from '../auth/auth.types';
import { NOT_FOUND } from '../constants';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Controller('playlist')
export class PlaylistController {
  constructor(private playlistService: PlaylistService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() request: UserReq, @Body('name') name: string) {
    return this.playlistService.create({ author: request.user.name, name });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Req() request: UserReq) {
    return this.playlistService.getAll(request.user.name);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Req() request: UserReq, @Param('id') _id: string) {
    const playlist = await this.playlistService.getOne(request.user.name, _id);

    if (!playlist) {
      throw new NotFoundException(NOT_FOUND);
    }

    return playlist;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Req() request: UserReq,
    @Param('id') _id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    const updatedPlaylist = await this.playlistService.update(request.user.name, _id, updatePlaylistDto);

    if (!updatedPlaylist) {
      throw new NotFoundException(NOT_FOUND);
    }

    return updatedPlaylist;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Req() request: UserReq, @Param('id') _id: string) {
    await this.playlistService.delete(request.user.name, _id);
  }
}
