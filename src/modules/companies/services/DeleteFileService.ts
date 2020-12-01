import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IFilesRepository from '../repositories/IFilesRepository';

interface IRequest {
  file_id: string;
}

@injectable()
class DeleteFileService {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ file_id }: IRequest): Promise<void> {
    const file = await this.filesRepository.findById(file_id);

    if (!file) {
      throw new AppError('Ativo não encontrado.', 401);
    }

    if (file) {
      await this.storageProvider.deleteFile(file.nm_s3_name);
    }
  }
}

export default DeleteFileService;
