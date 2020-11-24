import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITagsRepository from '../repositories/ITagsRepository';

import Tag from '../infra/typeorm/entities/Tag';

interface IRequest {
  nm_tag: string;
  is_fixed: boolean;
  store_owner_id: string;
  active: boolean;
}

@injectable()
class CreateTagService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute({
    nm_tag,
    is_fixed,
    store_owner_id,
    active,
  }: IRequest): Promise<Tag> {
    if (!nm_tag) {
      throw new AppError('tag é obrigatório.');
    }

    const checkTagExists = await this.tagsRepository.findByTag(
      nm_tag,
      store_owner_id,
    );

    if (checkTagExists) {
      throw new AppError('Tag já existe.');
    }

    try {
      const tag = await this.tagsRepository.create({
        nm_tag,
        is_fixed,
        store_owner_id,
        active,
      });
      return tag;
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export default CreateTagService;
