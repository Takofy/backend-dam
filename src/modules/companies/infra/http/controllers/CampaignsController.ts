import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';

import CreateCampaignService from '@modules/companies/services/CreateCampaignService';

import Campaign from '@modules/companies/infra/typeorm/entities/Campaign';

export default class ProjectsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const campaignsRepository = getRepository(Campaign);

    const campaigns = await campaignsRepository.find();

    return response.json(campaigns);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    // const storesId = request.body.store_owner_id;
    const storeId = request.params.store_id;

    const campaignsRepository = getRepository(Campaign);

    const campaigns = await campaignsRepository.find({
      where: { store_owner_id: storeId },
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
