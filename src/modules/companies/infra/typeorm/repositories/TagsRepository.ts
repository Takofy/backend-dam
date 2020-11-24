import { getRepository, Repository } from 'typeorm';

import ITagsRepository from '@modules/companies/repositories/ITagsRepository';
import ICreateTagDTO from '@modules/companies/dtos/ICreateTagDTO';

import AppError from '@shared/errors/AppError';
import Tag from '../entities/Tag';

class TagsRepository implements ITagsRepository {
  private ormRepository: Repository<Tag>;

  constructor() {
    this.ormRepository = getRepository(Tag);
  }

  public async findByTag(
    nm_tag: string,
    store_owner_id: string,
  ): Promise<Tag | undefined> {
    try {
      const tag = await this.ormRepository.findOne({
        nm_tag,
        store_owner_id,
      });
      return tag;
    } catch (error) {
      throw new AppError(error);
    }
  }

  public async create(tagData: ICreateTagDTO): Promise<Tag> {
    const tag = this.ormRepository.create(tagData);

    await this.ormRepository.save(tag);

    return tag;
  }

  public async save(tag: Tag): Promise<Tag> {
    return this.ormRepository.save(tag);
  }
}

export default TagsRepository;
