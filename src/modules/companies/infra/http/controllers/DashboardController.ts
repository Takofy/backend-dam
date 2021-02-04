import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import UserStore from '@modules/users/infra/typeorm/entities/UserStore';
import Store from '@modules/companies/infra/typeorm/entities/Store';
import Campaign from '@modules/companies/infra/typeorm/entities/Campaign';
import File from '@modules/companies/infra/typeorm/entities/File';

export default class ProjectsController {
  // public async index(request: Request, response: Response): Promise<Response> {}

  public async show(request: Request, response: Response): Promise<Response> {
    const userStoreRepository = getRepository(UserStore);

    const userId = request.user.id;

    const store = await userStoreRepository
      .createQueryBuilder('us')
      .leftJoinAndSelect(Store, 'store', 'store.id = us.store_id')
      .where(`us.user_id = '${userId}'`)
      .select('store')
      .getRawOne();

    const storeId = store.store_id;

    const campaignsRepository = getRepository(Campaign);

    const campaigns = await campaignsRepository.find({
      where: { store_owner_id: storeId, active: true },
      order: {
        updated_at: 'DESC',
      },
      take: 10,
    });

    const filesRepository = getRepository(File);

    const allFiles = await filesRepository.find({
      where: { store_owner_id: storeId },
    });

    const activeFiles = await filesRepository.find({
      where: { store_owner_id: storeId, active: true },
    });

    const countAllFiles = allFiles.length;
    const countActiveFiles = activeFiles.length;

    return response.json({ countAllFiles, countActiveFiles, campaigns });
  }
}
