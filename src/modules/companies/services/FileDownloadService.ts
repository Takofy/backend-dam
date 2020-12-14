import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IFilesRepository from '../repositories/IFilesRepository';

import File from '../infra/typeorm/entities/File';

interface IRequest {
  files: string;
}

@injectable()
class FileDownloadService {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(files: string): Promise<string> {
    const filename = await this.storageProvider.downloadFile(files);

    return filename;
  }
}

export default FileDownloadService;
