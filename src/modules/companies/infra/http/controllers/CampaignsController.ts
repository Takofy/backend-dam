import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';

import CreateCampaignService from '@modules/companies/services/CreateCampaignService';

import UserStore from '@modules/users/infra/typeorm/entities/UserStore';
import Store from '@modules/companies/infra/typeorm/entities/Store';
import Campaign from '@modules/companies/infra/typeorm/entities/Campaign';

export default class ProjectsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const campaignsRepository = getRepository(Campaign);

    const campaigns = await campaignsRepository.find();

    return response.json(campaigns);
  }

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
    });

    return response.json(campaigns);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createCampaign = container.resolve(CreateCampaignService);

    const campaign = await createCampaign.execute(data);

    return response.json(campaign);
  }
}
