import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICampaignsRepository from '../repositories/ICampaignsRepository';

import Campaign from '../infra/typeorm/entities/Campaign';

interface IRequest {
  campaign_id: string;
  nm_campaign_name: string;
  nm_campaign_description: string;
  path_image: string;
  path_icon: string;
  dt_publication: Date;
  dt_expiration: Date;
  store_owner_id: string;
  user_owner_id?: string | undefined;
  active: boolean;
}

@injectable()
class UpdateCampaignService {
  constructor(
    @inject('CampaignsRepository')
    private campaignsRepository: ICampaignsRepository,
  ) {}

  public async execute({
    campaign_id,
    nm_campaign_name,
    nm_campaign_description,
    path_image,
    path_icon,
    dt_publication,
    dt_expiration,
    user_owner_id,
    store_owner_id,
    active,
  }: IRequest): Promise<Campaign> {
    const campaign = await this.campaignsRepository.findById(campaign_id);
    // console.log(campaign_id);
    // console.log(campaign);
    // return;

    if (!campaign) {
      throw new AppError('Coleção não encontrada.', 401);
    }

    if (nm_campaign_name) {
      campaign.nm_campaign_name = nm_campaign_name;
    }
    if (nm_campaign_description) {
      campaign.nm_campaign_description = nm_campaign_description;
    }
    if (path_image) {
      campaign.path_image = path_image;
    }
    if (path_icon) {
      campaign.path_icon = path_icon;
    }
    if (dt_publication) {
      campaign.dt_publication = dt_publication;
    }
    if (dt_expiration) {
      campaign.dt_expiration = dt_expiration;
    }
    if (user_owner_id) {
      campaign.user_owner_id = user_owner_id;
    }
    if (store_owner_id) {
      campaign.store_owner_id = store_owner_id;
    }
    if (active) {
      campaign.active = active;
    }

    await this.campaignsRepository.save(campaign);

    return campaign;
  }
}

export default UpdateCampaignService;
