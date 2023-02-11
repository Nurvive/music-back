import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as uuid from 'uuid';
import * as fs from 'fs';

export enum FileType {
  AUDIO = 'audio',
}

@Injectable()
export class FileService {
  createFile(type: FileType, file: Express.Multer.File) {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static', type);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (e) {
      throw new HttpException(
        (e as Error)?.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  removeFile() {}
}
