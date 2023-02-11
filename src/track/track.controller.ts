import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { ObjectId } from 'mongoose';
import { CreateGenreDto } from './dto/create-genre.dto';
import { AddGenreDto } from './dto/add-genre.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  @UseInterceptors(FileInterceptor('audio'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateTrackDto,
  ) {
    return this.trackService.create(dto, file);
  }

  @Get()
  getAll(@Query('limit') limit: number, @Query('offset') offset: number) {
    return this.trackService.getAll(limit, offset);
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.trackService.search(query);
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.trackService.delete(id);
  }

  @Post('addGenre')
  addGenre(@Body() dto: AddGenreDto) {
    return this.trackService.addGenre(dto);
  }

  @Post('genre')
  createGenre(@Body() dto: CreateGenreDto) {
    return this.trackService.createGenre(dto);
  }

  @Post('/listen/:id')
  listen(@Param('id') id: ObjectId) {
    this.trackService.listen(id);
  }
}
