import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IFilesRepository from '../repositories/IFilesRepository';

import File from '../infra/typeorm/entities/File';

interface IRequest {
  file_id: string;
  nm_title: string;
  nm_description: string;
  dt_expiration: Date;
  campaign_owner_id: string;
  active: boolean;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository,
  ) {}

  public async execute({
    file_id,
    nm_title,
    nm_description,
    dt_expiration,
    campaign_owner_id,
    active,
  }: IRequest): Promise<File> {
    const file = await this.filesRepository.findById(file_id);

    if (!file) {
      throw new AppError('Arquivo não encontrado.', 401);
    }

    if (nm_title) {
      file.nm_title = nm_title;
    }
    if (nm_description) {
      file.nm_description = nm_description;
    }
    if (dt_expiration) {
      file.dt_expiration = dt_expiration;
    }
    if (campaign_owner_id) {
      file.campaign_owner_id = campaign_owner_id;
    }
    if (active) {
      file.active = active;
    }

    await this.filesRepository.save(file);

    return file;
  }
}

export default UpdateUserAvatarService;
