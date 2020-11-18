import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';

import CreateFileService from '@modules/companies/services/CreateFileService';
import FileUploadService from '@modules/companies/services/FileUploadService';

import UserStore from '@modules/users/infra/typeorm/entities/UserStore';
import File from '@modules/companies/infra/typeorm/entities/File';

export default class FilesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { campaign_id } = request.params;

    const filesRepository = getRepository(File);
    const files = await filesRepository.find({
      where: { campaign_owner_id: campaign_id, active: true },
      order: {
        updated_at: 'DESC',
      },
    });

    return response.json(files);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { file_id } = request.params;

    const filesRepository = getRepository(File);

    const file = await filesRepository.findOne({
      where: { id: file_id },
    });

    return response.json(file);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    console.log(request.file);
    return;
    const userStoreRepository = getRepository(UserStore);

    const userId = request.user.id;

    const store = await userStoreRepository.findOne({
      where: { user_id: userId },
    });

    const storeId = store.store_id;

    // upload do ativo
    const fileUploadService = container.resolve(FileUploadService);

    // Upload file and return hashed file name
    const fileUploaded = await fileUploadService.execute({
      fileName: request.file.filename,
    });

    // console.log(fileUploaded);
    // console.log(request.file);
    // console.log(request.body);

    // const fileData = {
    //   nm_title: request.file.originalname || 'Sem titulo',
    //   nm_description: '',
    //   nm_original_file_name: request.file.originalname || 'non-original-name',
    //   nm_type: request.file.originalname.split('.').pop() || 'non-type',
    //   nm_subtype: '',
    //   nm_mime: request.file.mimetype || 'non-mime',
    //   nm_s3_version: fileUploaded?.file || '',
    //   nm_s3_name: fileUploaded?.file || '',
    //   nm_url: fileUploaded?.url || '',
    //   user_owner_id: '',
    //   store_owner_id: '',
    //   campaign_owner_id: request.body.campaign_id || 'non-campaign-id',
    //   active: true,
    // };

    // const fileName = request.file.filename.replace(/\s/g, '-');
    const fileName = request.file.filename;
    const filePath = `${process.env.STORAGE_BASE_PATH}${fileName}`;

    const fileType = request.file.originalname.toLowerCase().split('.').pop();

    const fileData = {
      nm_title: request.body.nm_title || 'Sem titulo',
      nm_description: request.body.nm_description || '',
      nm_original_file_name: request.file.originalname || 'non-original-name',
      nm_type: fileType || 'non-type',
      nm_subtype: request.body.nm_subtype || 'image',
      nm_mime: request.file.mimetype || 'non-mime',
      nm_s3_version: request.body.nm_s3_version || '',
      nm_s3_name: fileName || '',
      nm_url: filePath || '',
      campaign_owner_id: request.body.campaign_owner_id,
      user_owner_id: userId,
      store_owner_id: storeId,
      active: true,
    };

    const createFile = container.resolve(CreateFileService);

    const file = await createFile.execute(fileData);

    return response.json(file);
  }
}
