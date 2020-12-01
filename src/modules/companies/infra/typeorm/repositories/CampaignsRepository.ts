import { getRepository, Repository, Brackets } from 'typeorm';

import ICampaignsRepository from '@modules/companies/repositories/ICampaignsRepository';
import ICreateCampaignDTO from '@modules/companies/dtos/ICreateCampaignDTO';

import AppError from '@shared/errors/AppError';
import Campaign from '../entities/Campaign';

class CampaignsReository implements ICampaignsRepository {
  private ormRepository: Repository<Campaign>;

  constructor() {
    this.ormRepository = getRepository(Campaign);
  }

  public async findById(id: string): Promise<Campaign | undefined> {
    const campaign = await this.ormRepository.findOne(id);

    return campaign;
  }

  // public async findByCampaign(
  //   nm_campaign_name: string,
  //   store_owner_id: string,
  //   campaign_father_id?: string | undefined,
  // ): Promise<Campaign | undefined> {
  //   try {
  //     const campaign = await this.ormRepository
  //       .createQueryBuilder('campaign')
  //       .where('campaign.nm_campaign_name = :nm_campaign_name', {
  //         nm_campaign_name,
  //       })
  //       .andWhere('campaign.store_owner_id = :store_owner_id', {
  //         store_owner_id,
  //       })
  //       .andWhere(
  //         new Brackets(qb => {
  //           qb.where('campaign.campaign_father_id = :campaign_father_id', {
  //             campaign_father_id,
  //           }).orWhere('campaign.campaign_father_id is null');
  //         }),
  //       )
  //       .getOne();

  //     return campaign;
  //   } catch (error) {
  //     throw new AppError(error);
  //   }
  // }

  public async findByCampaign(
    nm_campaign_name: string,
    store_owner_id: string,
  ): Promise<Campaign | undefined> {
    // Nobrega attention point - Alterei o where apra array para inserir OR ao invés de AND
    const findStore = await this.ormRepository.findOne({
      where: { nm_campaign_name, store_owner_id },
    });

    return findStore;
  }

  public async create(campaignData: ICreateCampaignDTO): Promise<Campaign> {
    const campaign = this.ormRepository.create(campaignData);

    await this.ormRepository.save(campaign);

    return campaign;
  }

  public async save(campaign: Campaign): Promise<Campaign> {
    return this.ormRepository.save(campaign);
  }
}

export default CampaignsReository;
