import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';
import sizeOf from 'image-size';
import { partial } from 'filesize';

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
    const userStoreRepository = getRepository(UserStore);

    const userId = request.user.id;

    const store = await userStoreRepository.findOne({
      where: { user_id: userId },
    });

    const storeId = store.store_id;

    // pega arquivos
    const { files } = request;

    // await files.forEach(file => {
    //   console.log(file.originalname);
    //   console.log(file.mimetype);
    // });
    // return;

    await files.forEach(file => {
      // upload do ativo
      const fileUploadService = container.resolve(FileUploadService);

      // Upload file and return hashed file name
      const fileUploaded = fileUploadService.execute({
        fileName: file.filename,
      });

      // Ler dimensões do ativo
      const fileDimensions = sizeOf(file.path);
      const fileWidh = fileDimensions.width;
      const fileHeight = fileDimensions.height;

      // Tamanho do arquivo
      const size = partial({ locale: 'de' });
      const fileSize = size(file.size);
      // const fileSize = 0;

      // Salva url com "+" no lugar de " "
      const s3FileName = file.filename.replace(/\s/g, '+');
      const fileName = file.filename;
      const filePath = `${process.env.STORAGE_BASE_PATH}${s3FileName}`;

      const fileMime = file.mimetype.toLowerCase().split('/').shift();
      const fileType = file.mimetype.toLowerCase().split('/').pop();

      if (request.body.active) {
        const activeCheck = request.body.active;
      } else {
        const activeCheck = true;
      }

      const fileData = {
        nm_title: file.originalname || 'Sem titulo',
        nm_description: request.body.nm_description || '',
        nm_original_file_name: file.originalname || 'non-original-name',
        nm_type: fileType || 'non-type',
        nm_subtype: request.body.nm_subtype || 'image',
        nm_mime: fileMime || 'non-mime',
        nm_s3_version: request.body.nm_s3_version || '',
        nm_s3_name: fileName || '',
        nm_url: filePath || '',
        nr_code: request.body.nr_code || 0,
        nr_width: fileWidh || 0,
        nr_height: fileHeight || 0,
        nr_size: fileSize || 0,
        dt_publication: request.body.dt_publication || '2020-01-01',
        dt_expiration: request.body.dt_expiration || '2020-01-01',
        campaign_owner_id: request.body.campaign_owner_id,
        user_owner_id: userId,
        store_owner_id: storeId,
        active: activeCheck || true,
      };

      const createFile = container.resolve(CreateFileService);

      const file = createFile.execute(fileData);
    });

    // // upload do ativo
    // const fileUploadService = container.resolve(FileUploadService);

    // // Upload file and return hashed file name
    // const fileUploaded = await fileUploadService.execute({
    //   fileName: request.file.filename,
    // });

    // // Ler dimensões do ativo
    // const fileDimensions = sizeOf(request.file.path);
    // const fileWidh = fileDimensions.width;
    // const fileHeight = fileDimensions.height;

    // // Tamanho do arquivo
    // const size = partial({ locale: 'de' });
    // const fileSize = size(request.file.size);

    // // const fileName = request.file.filename.replace(/\s/g, '-');
    // const fileName = request.file.filename;
    // const filePath = `${process.env.STORAGE_BASE_PATH}${fileName}`;

    // const fileMime = request.file.mimetype.toLowerCase().split('/').shift();
    // const fileType = request.file.mimetype.toLowerCase().split('/').pop();

    // const fileData = {
    //   nm_title: request.body.nm_title || 'Sem titulo',
    //   nm_description: request.body.nm_description || '',
    //   nm_original_file_name: request.file.originalname || 'non-original-name',
    //   nm_type: fileType || 'non-type',
    //   nm_subtype: request.body.nm_subtype || 'image',
    //   nm_mime: fileMime || 'non-mime',
    //   nm_s3_version: request.body.nm_s3_version || '',
    //   nm_s3_name: fileName || '',
    //   nm_url: filePath || '',
    //   nr_code: request.body.nr_code || 0,
    //   nr_width: fileWidh || 0,
    //   nr_height: fileHeight || 0,
    //   nr_size: fileSize || 0,
    //   dt_publication: request.body.dt_publication || '',
    //   dt_expiration: request.body.dt_expiration || '',
    //   campaign_owner_id: request.body.campaign_owner_id,
    //   user_owner_id: userId,
    //   store_owner_id: storeId,
    //   active: request.body.active,
    // };

    // const createFile = container.resolve(CreateFileService);

    // const file = await createFile.execute(fileData);

    // return response.json(files);
    return response.send('Upload ok.');
  }
}
