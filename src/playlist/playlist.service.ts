import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { Playlist, PlaylistDocument } from './schemas/playlist.schema';
import { TrackService } from '../track/track.service';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { NOT_FOUND } from '../constants';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>,
    private readonly trackService: TrackService,
  ) {}

  async create(dto: CreatePlaylistDto) {
    return await this.playlistModel.create(dto).catch((err) => {
      throw new BadRequestException(err.message);
    });
  }

  async getAll(author: string) {
    return this.playlistModel.find({ author }).populate('tracks');
  }

  async getOne(author: string, _id: string) {
    return this.playlistModel.findOne({ author, _id }).populate('tracks');
  }

  async update(author: string, _id: string, dto: UpdatePlaylistDto) {
    return this.playlistModel
      .findOneAndUpdate({ author, _id }, dto, { new: true })
      .catch((err) => {
        throw new BadRequestException(err.message);
      });
  }

  async delete(author: string, _id: string) {
    const playlistForDelete = await this.playlistModel.findOne({ author, _id });

    if (!playlistForDelete) {
      throw new NotFoundException(NOT_FOUND);
    }

    await playlistForDelete.deleteOne();
  }
}
