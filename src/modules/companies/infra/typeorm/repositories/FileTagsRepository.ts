import { getRepository, Repository } from 'typeorm';

import IFileTagsRepository from '@modules/companies/repositories/IFileTagsRepository';
import ICreateFileTagDTO from '@modules/companies/dtos/ICreateFileTagDTO';

import AppError from '@shared/errors/AppError';
import FileTags from '../entities/FileTags';

class FileTagsRepository implements IFileTagsRepository {
  private ormRepository: Repository<FileTags>;

  constructor() {
    this.ormRepository = getRepository(FileTags);
  }

  public async findByFileTag(
    tag_id: string,
    file_id: string,
  ): Promise<FileTags | undefined> {
    try {
      const fileTag = await this.ormRepository.findOne({
        tag_id,
        file_id,
      });
      return fileTag;
    } catch (error) {
      throw new AppError(error);
    }
  }

  public async create(fileData: ICreateFileTagDTO): Promise<FileTags> {
    const fileTag = this.ormRepository.create(fileData);

    await this.ormRepository.save(fileTag);

    return fileTag;
  }

  public async save(fileTag: FileTags): Promise<FileTags> {
    return this.ormRepository.save(fileTag);
  }
}

export default FileTagsRepository;
