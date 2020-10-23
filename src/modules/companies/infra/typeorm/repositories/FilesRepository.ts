import { getRepository, Repository } from 'typeorm';

import IFilesRepository from '@modules/companies/repositories/IFilesRepository';
import ICreateFileDTO from '@modules/companies/dtos/ICreateFileDTO';

import File from '../entities/File';

class FilesRepository implements IFilesRepository {
  private ormRepository: Repository<File>;

  constructor() {
    this.ormRepository = getRepository(File);
  }

  public async findByNameAndCampaign(
    nm_original_file_name: string,
    campaign_owner_id: string,
  ): Promise<File | undefined> {
    const file = await this.ormRepository.findOne({
      nm_original_file_name,
      campaign_owner_id,
    });

    return file;
  }

  public async create(fileData: ICreateFileDTO): Promise<File> {
    const file = this.ormRepository.create(fileData);

    await this.ormRepository.save(file);

    return file;
  }

  public async save(file: File): Promise<File> {
    return this.ormRepository.save(file);
  }
}

export default FilesRepository;
