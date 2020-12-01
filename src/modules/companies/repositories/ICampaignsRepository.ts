import Campaign from '../infra/typeorm/entities/Campaign';
import ICreateCampaignDTO from '../dtos/ICreateCampaignDTO';

export default interface ICampaignsRepository {
  findByCampaign(
    nm_campaign_name: string,
    store_owner_id: string,
  ): Promise<Campaign | undefined>;
  findById(id: string): Promise<Campaign | undefined>;
  create(data: ICreateCampaignDTO): Promise<Campaign>;
  save(campaign: Campaign): Promise<Campaign>;
}
