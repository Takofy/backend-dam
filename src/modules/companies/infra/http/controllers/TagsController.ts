import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import CreateTagService from '@modules/companies/services/CreateTagService';

import UserStore from '@modules/users/infra/typeorm/entities/UserStore';
import Store from '@modules/companies/infra/typeorm/entities/Store';
import FileTags from '@modules/companies/infra/typeorm/entities/FileTags';
import Tag from '@modules/companies/infra/typeorm/entities/Tag';

export default class TagsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const userStoreRepository = getRepository(UserStore);
    const store = await userStoreRepository
      .createQueryBuilder('us')
      .leftJoinAndSelect(Store, 'store', 'store.id = us.store_id')
      .where(`us.user_id = '${userId}'`)
      .select('store')
      .getRawOne();

    const storeId = store.store_id;

    const tagsRepository = getRepository(Tag);

    const tags = await tagsRepository
      .createQueryBuilder('tag')
      .leftJoinAndSelect(FileTags, 'filetag', 'filetag.tag_id = tag.id')
      .where(`tag.store_owner_id = '${storeId}'`)
      .select()
      .getRawMany();

    return response.json(tags);

    // const tags = await tagsRepository.find({
    //   where: { store_owner_id: storeId },
    // });

    // return response.json(tags);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request.user.id;

      const userStoreRepository = getRepository(UserStore);
      const store = await userStoreRepository
        .createQueryBuilder('us')
        .leftJoinAndSelect(Store, 'store', 'store.id = us.store_id')
        .where(`us.user_id = '${userId}'`)
        .select('store')
        .getRawOne();

      const storeId = store.store_id;

      const tagId = request.params.tag_id;
      const tagsRepository = getRepository(Tag);
      const tags = await tagsRepository.findOne({
        where: { id: tagId, store_owner_id: storeId },
      });

      if (!tags) {
        throw new AppError('Tag não encontrada.');
      }

      return response.json(tags);
    } catch (error) {
      throw new AppError(error);
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const userStoreRepository = getRepository(UserStore);

    const userId = request.user.id;

    const store = await userStoreRepository
      .createQueryBuilder('us')
      .leftJoinAndSelect(Store, 'store', 'store.id = us.store_id')
      .where(`us.user_id = '${userId}'`)
      .select('store')
      .getRawOne();

    const storeId = store.store_id;

    const tagName = request.body.nm_tag;

    const nm_tag = tagName.toLowerCase();
    const { is_fixed, active } = request.body;
    const store_owner_id = storeId;

    const createTag = container.resolve(CreateTagService);

    const tag = await createTag.execute({
      nm_tag,
      is_fixed,
      store_owner_id,
      active,
    });

    return response.status(200).json(tag);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const tagId = request.params.tag_id;

      const tagsRepository = getRepository(Tag);

      await tagsRepository.delete(tagId);

      return response.status(200).send();
    } catch (error) {
      throw new AppError(error);
    }
  }
}
