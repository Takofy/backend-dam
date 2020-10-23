import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICampaignsRepository from '../repositories/ICampaignsRepository';

import Campaign from '../infra/typeorm/entities/Campaign';

interface IRequest {
  nm_campaign_name: string;
  nm_campaign_description: string;
  path_image: string;
  store_owner_id: string;
  user_owner_id?: string | undefined;
  active: boolean;
}

@injectable()
class CreateCampaignService {
  constructor(
    @inject('CampaignsRepository')
    private campaignsRepository: ICampaignsRepository,
  ) {}

  public async execute({
    nm_campaign_name,
    nm_campaign_description,
    path_image,
    user_owner_id,
    store_owner_id,
    active,
  }: IRequest): Promise<Campaign> {
    const checkCampaignExists = await this.campaignsRepository.findByCampaign(
      nm_campaign_name,
      store_owner_id,
    );

    if (checkCampaignExists) {
      throw new AppError('Campanha já existe.');
    }

    try {
      const campaign = await this.campaignsRepository.create({
        nm_campaign_name,
        nm_campaign_description,
        path_image,
        user_owner_id,
        store_owner_id,
        active,
      });
      return campaign;
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export default CreateCampaignService;
