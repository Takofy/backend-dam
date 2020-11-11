import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';

import CreateCampaignService from '@modules/companies/services/CreateCampaignService';
import FileUploadService from '@modules/companies/services/FileUploadService';

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
    const fileUploadService = container.resolve(FileUploadService);

    if (request.file) {
      // Upload file and return hashed file name
      const fileUploaded = await fileUploadService.execute({
        fileName: request.file.filename,
      });

      const hashedImgName = request.file.filename;
    } else {
      const hashedImgName = 'recebido-campaign-default-image.jpg';
    }

    if (request.body.path_icon) {
      const iconName = request.body.path_icon;
    } else {
      const iconName = 'campaign-default-icon.png';
    }

    const imgPath = `${process.env.STORAGE_BASE_PATH}${hashedImgName}`;
    console.log(imgPath);
    const iconPath = `${process.env.STORAGE_BASE_PATH}${iconName}`;
    const imgBasePath = `${process.env.STORAGE_BASE_PATH}campaign-default-image.jpg`;
    const iconBasePath = `${process.env.STORAGE_BASE_PATH}campaign-default-icon.png`;

    const fileData = {
      nm_campaign_name: request.body.nm_campaign_name || 'Sem titulo',
      nm_campaign_description: request.body.nm_campaign_description || '',
      path_image: imgPath || imgBasePath,
      path_icon: iconPath || iconBasePath,
      dt_publication: request.body.dt_publication || '2020-01-01',
      dt_expiration: request.body.dt_expiration || '2020-01-01',
      user_owner_id: request.body.user_owner_id,
      store_owner_id: request.body.store_owner_id,
      active: true,
    };

    const createCampaign = container.resolve(CreateCampaignService);

    const campaign = await createCampaign.execute(fileData);

    return response.json(campaign);
  }
}
