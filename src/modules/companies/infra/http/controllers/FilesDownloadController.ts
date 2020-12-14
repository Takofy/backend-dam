import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository, Raw } from 'typeorm';

import AppError from '@shared/errors/AppError';
import FileDownloadService from '@modules/companies/services/FileDownloadService';

import File from '@modules/companies/infra/typeorm/entities/File';

export default class FilesDownloadController {
  public async index(request: Request, response: Response): Promise<Response> {
    const filesId = request.body.files;

    const filesRepository = getRepository(File);
    const files = await filesRepository
      .createQueryBuilder('f')
      .where('f.id IN (:...ids)', {
        ids: [
          '5a55fa26-19f8-4a61-abef-def2639178fa',
          '48015735-316d-4ed6-ac12-cc5b7a951546',
        ],
      })
      .select(['f.nm_s3_name'])
      .getRawMany();

    const filesArray = [];

    await Promise.all(
      files.map(async fileName => {
        filesArray.push(fileName.f_nm_s3_name);
      }),
    );

    const fileDownloadService = container.resolve(FileDownloadService);

    const file = await fileDownloadService.execute(filesArray);

    return response.download(file);

    // try {
    //   return response.status(200).send();
    // } catch (error) {
    //   throw new AppError(error);
    // }
  }
}
