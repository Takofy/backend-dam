import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IFilesRepository from '../repositories/IFilesRepository';

import File from '../infra/typeorm/entities/File';

interface IRequest {
  nm_title: string;
  nm_description: string;
  nm_original_file_name: string;
  nm_type: string;
  nm_subtype: string;
  nm_mime: string;
  nm_s3_version: string;
  nm_s3_name: string;
  nm_url: string;
  nr_code: number;
  nr_width: number;
  nr_height: number;
  nr_size: string;
  dt_publication: Date;
  dt_expiration: Date;
  campaign_owner_id: string;
  user_owner_id: string;
  store_owner_id: string;
  active: boolean;
  path_thumbnail: string;
  nm_status: string;
}

@injectable()
class CreateFileService {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository,
  ) {}

  public async execute({
    nm_title,
    nm_description,
    nm_original_file_name,
    nm_type,
    nm_subtype,
    nm_mime,
    nm_s3_version,
    nm_s3_name,
    nm_url,
    nr_code,
    nr_width,
    nr_height,
    nr_size,
    dt_publication,
    dt_expiration,
    campaign_owner_id,
    user_owner_id,
    store_owner_id,
    active,
    path_thumbnail,
    nm_status,
  }: IRequest): Promise<File> {
    const checkFileExists = await this.filesRepository.findByNameAndCampaign(
      nm_s3_version,
      campaign_owner_id,
    );

    if (checkFileExists) {
      throw new AppError('Arquivo já existe.');
    }

    const file = this.filesRepository.create({
      nm_title,
      nm_description,
      nm_original_file_name,
      nm_type,
      nm_subtype,
      nm_mime,
      nm_s3_version,
      nm_s3_name,
      nm_url,
      nr_code,
      nr_width,
      nr_height,
      nr_size,
      dt_publication,
      dt_expiration,
      campaign_owner_id,
      user_owner_id,
      store_owner_id,
      active,
      path_thumbnail,
      nm_status,
    });

    return file;
  }
}

export default CreateFileService;
