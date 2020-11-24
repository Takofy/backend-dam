import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IFileTagsRepository from '../repositories/IFileTagsRepository';

import FileTags from '../infra/typeorm/entities/FileTags';

interface IRequest {
  tag_id: string;
  file_id: string;
  active: boolean;
}

@injectable()
class CreateFileTagService {
  constructor(
    @inject('FileTagsRepository')
    private fileTagRepository: IFileTagsRepository,
  ) {}

  public async execute({
    tag_id,
    file_id,
    active,
  }: IRequest): Promise<FileTags> {
    if (!file_id || !tag_id) {
      throw new AppError('Todos os campos são obrigatórios.');
    }

    const checkFileTagExists = await this.fileTagRepository.findByFileTag(
      tag_id,
      file_id,
    );

    if (checkFileTagExists) {
      throw new AppError('Registro já existe');
    }

    try {
      const fileTag = await this.fileTagRepository.create({
        tag_id,
        file_id,
        active,
      });
      return fileTag;
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export default CreateFileTagService;
