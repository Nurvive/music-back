import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from './schemas/track.schema';
import { Model, ObjectId } from 'mongoose';
import { Genre, GenreDocument } from './schemas/genre.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { AddGenreDto } from './dto/add-genre.dto';
import { CreateGenreDto } from './dto/create-genre.dto';
import { FileService, FileType } from '../file/file.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Genre.name) private genreModel: Model<GenreDocument>,
    private fileService: FileService,
  ) {}

  async create(
    dto: CreateTrackDto,
    audio: Express.Multer.File,
    picture: Express.Multer.File
  ): Promise<Track> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileService.createFile(FileType.PICTURE, picture);
    return await this.trackModel.create({
      ...dto,
      listenCount: 0,
      audio: audioPath,
      picture: picturePath
    });
  }

  async getAll(limit = 10, offset = 0): Promise<Track[]> {
    return this.trackModel.find().skip(offset).limit(limit);
  }

  async getOne(id: ObjectId): Promise<Track> {
    return this.trackModel.findById(id);
  }

  async delete(id: ObjectId) {
    const track = await this.trackModel.findByIdAndDelete(id);
    return track._id;
  }

  async addGenre(dto: AddGenreDto) {
    const track = await this.trackModel.findById(dto.trackId);
    const genres = await Promise.all(
      dto.genres.map(async (genre) => await this.genreModel.findById(genre)),
    );
    track.genres = [...track.genres, ...genres];
    await track.save();
    return track;
  }

  async createGenre(dto: CreateGenreDto): Promise<Genre> {
    return await this.genreModel.create(dto);
  }

  async listen(id: ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listenCount += 1;
    track.save();
  }

  async search(query: string): Promise<Track[]> {
    return this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
  }
}
