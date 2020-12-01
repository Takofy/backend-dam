import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ICampaignsRepository from '../repositories/ICampaignsRepository';

interface IRequest {
  campaign_id: string;
}

@injectable()
class DeleteCampaignImgService {
  constructor(
    @inject('CampaignsRepository')
    private campaignsRepository: ICampaignsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ campaign_id }: IRequest): Promise<void> {
    const campaign = await this.campaignsRepository.findById(campaign_id);

    if (!campaign) {
      throw new AppError('Campanha não encontrada.', 401);
    }

    if (campaign) {
      const imgS3Name = campaign.path_image.split('/').pop();
      if (imgS3Name && imgS3Name !== 'campaign-default-image.jpg') {
        await this.storageProvider.deleteFile(imgS3Name);
      }
    }
  }
}

export default DeleteCampaignImgService;
