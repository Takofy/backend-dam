import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import CreateCampaignService from '@modules/companies/services/CreateCampaignService';
import FileUploadService from '@modules/companies/services/FileUploadService';
import DeleteCampaignImgService from '@modules/companies/services/DeleteCampaignImgService';

import UserStore from '@modules/users/infra/typeorm/entities/UserStore';
import Store from '@modules/companies/infra/typeorm/entities/Store';
import Campaign from '@modules/companies/infra/typeorm/entities/Campaign';

export default class CampaignsController {
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
      order: {
        updated_at: 'DESC',
      },
    });

    return response.json(campaigns);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    // Pega id do usuário e id da empresa do usuário logado
    const userStoreRepository = getRepository(UserStore);

    const userId = request.user.id;

    const store = await userStoreRepository.findOne({
      where: { user_id: userId },
    });

    const storeId = store.store_id;

    // Upload imagem da campanha
    const fileUploadService = container.resolve(FileUploadService);

    if (request.file) {
      // Upload file and return hashed file name
      const fileUploaded = await fileUploadService.execute({
        fileName: request.file.filename,
      });

      const hashedImgName = request.file.filename;
    } else {
      const hashedImgName = 'campaign-default-image.jpg';
    }

    if (request.body.path_icon) {
      const iconName = request.body.path_icon;
    } else {
      const iconName = 'campaign-default-icon.png';
    }

    const imgPath = `${process.env.STORAGE_BASE_PATH}${hashedImgName}`;
    const iconPath = `${process.env.STORAGE_BASE_PATH}${iconName}`;
    const imgDefaultPath = `${process.env.STORAGE_BASE_PATH}campaign-default-image.jpg`;
    const iconDefaultPath = `${process.env.STORAGE_BASE_PATH}campaign-default-icon.png`;

    const fileData = {
      nm_campaign_name: request.body.nm_campaign_name || 'Sem titulo',
      nm_campaign_description: request.body.nm_campaign_description || '',
      path_image: imgPath || imgDefaultPath,
      path_icon: iconPath || iconDefaultPath,
      dt_publication: request.body.dt_publication || '2020-01-01',
      dt_expiration: request.body.dt_expiration || '2020-01-01',
      user_owner_id: userId,
      store_owner_id: storeId,
      active: true,
    };

    const createCampaign = container.resolve(CreateCampaignService);

    const campaign = await createCampaign.execute(fileData);

    return response.json(campaign);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const campaignId = request.params.campaign_id;

    try {
      const deleteImg = container.resolve(DeleteCampaignImgService);

      await deleteImg.execute({
        campaign_id: campaignId,
      });

      const campaignsRepository = getRepository(Campaign);

      await campaignsRepository.delete(campaignId);

      return response.status(200).send();
    } catch (error) {
      throw new AppError(error);
    }
  }
}
