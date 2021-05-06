import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';

import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

import gm from 'gm';
import sizeOf from 'image-size';
import { partial } from 'filesize';
import { PDFDocument } from 'pdf-lib';
// import { PDFImage } from 'pdf-image';
// import { fromPath } from 'pdf2pic';

import AppError from '@shared/errors/AppError';

import CreateFileService from '@modules/companies/services/CreateFileService';
import FileUploadService from '@modules/companies/services/FileUploadService';
import UpdateFileService from '@modules/companies/services/UpdateFileService';
import DeleteFileService from '@modules/companies/services/DeleteFileService';

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

    const allFiles = await Promise.all(
      files.map(async file => {
        // upload do ativo
        const fileUploadService = container.resolve(FileUploadService);

        // Tamanho do arquivo
        const size = partial({ locale: 'de' });
        const fileSize = size(file.size);
        // const fileSize = 0;

        // Salva url com "+" no lugar de " "
        const s3FileName = file.filename.replace(/\s/g, '+');
        const fileName = file.filename;
        const filePath = `${process.env.STORAGE_BASE_PATH}${s3FileName}`;
        const thumbnailPath = `${process.env.STORAGE_BASE_RESIZED_PATH}resized-${s3FileName}`;

        const fileMime = file.mimetype.toLowerCase().split('/').shift();
        const fileType = file.mimetype.toLowerCase().split('/').pop();

        if (fileType === 'pdf') {
          const pdfFile = await fs.promises.readFile(file.path);

          // carrega pdf a partir dos bytes existentes do fs
          const pdfDoc = await PDFDocument.load(pdfFile);
          const pages = pdfDoc.getPages();
          const firstPage = pages[0];
          const { width, height } = firstPage.getSize();

          // Ler dimensões do ativo
          const fileWidh = String(width).split('.').shift();
          const fileHeight = String(height).split('.').shift();

          //   // Transformar PDF em Imagem
          //   const imagePath = path.resolve(
          //     uploadConfig.tmpFolder,
          //     'converted.png',
          //   );

          //   gm(`${file.path}[0]`).thumb(
          //     200, // Width
          //     200, // Height
          //     imagePath, // Output file name
          //     80, // Quality from 0 to 100
          //     function (error, stdout, stderr, command) {
          //       if (!error) {
          //         console.log(command);
          //       } else {
          //         console.log(error);
          //       }
          //     },
          //   );

          // const pdfImage = new PDFImage(file.path);
          // const imagePath = path.resolve(
          //   uploadConfig.tmpFolder,
          //   'converted.png',
          // );

          // pdfImage.convertFile().then(function (imagePath) {});
          // const imagePath = path.resolve(
          //   uploadConfig.tmpFolder,
          //   'converted.png',
          // );

          // const pdfImage = new PDFImage(file.path);

          // const final = await pdfImage.convertPage(0).then(() => {
          //   return response.sendFile(imagePath);
          // });

          // console.log(final);
          // return;

          // const options = {
          //   density: 100,
          //   // saveFilename: 's3FileName',
          //   format: 'png',
          //   width: 200,
          // };

          // const storeAsImage = fromPath(file.path, options);
          // const pageToConvertAsImage = 1;

          // console.log(storeAsImage);

          // await storeAsImage(pageToConvertAsImage);
        }

        if (
          fileType === 'jpg' ||
          fileType === 'png' ||
          fileType === 'jpeg' ||
          fileType === 'gif' ||
          fileType === 'webp' ||
          fileType === 'svg' ||
          fileType === 'tif'
        ) {
          // Ler dimensões do ativo
          const fileDimensions = sizeOf(file.path);
          const fileWidh = fileDimensions.width;
          const fileHeight = fileDimensions.height;
        }

        if (request.body.active) {
          const activeCheck = request.body.active;
        } else {
          const activeCheck = true;
        }

        // Upload file and return hashed file name
        const fileUploaded = await fileUploadService.execute({
          fileName: file.filename,
        });

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
          path_thumbnail: thumbnailPath || '',
          nm_status: request.body.nm_status || '',
        };

        const createFile = container.resolve(CreateFileService);

        const fileFinal = createFile.execute(fileData);

        return await fileFinal;
      }),
    );

    return response.status(200).json(allFiles);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      file_id,
      nm_title,
      nm_description,
      dt_expiration,
      campaign_owner_id,
      active,
      path_thumbnail,
      nm_status,
    } = request.body;

    const updateFileService = container.resolve(UpdateFileService);

    const file = await updateFileService.execute({
      file_id,
      nm_title,
      nm_description,
      dt_expiration,
      campaign_owner_id,
      active,
      path_thumbnail,
      nm_status,
    });

    return response.json(file);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const fileIds = request.body.files;

    try {
      await Promise.all(
        fileIds.map(async fileId => {
          const deleteFile = container.resolve(DeleteFileService);

          await deleteFile.execute({
            file_id: fileId,
          });

          const filesRepository = getRepository(File);

          await filesRepository.delete(fileId);
          return response.status(200).send();
        }),
      );

      return response.status(200).send();
    } catch (error) {
      throw new AppError(error);
    }
  }

  // public async delete(request: Request, response: Response): Promise<Response> {
  //   const fileId = request.params.file_id;

  //   try {
  //     const deleteFile = container.resolve(DeleteFileService);

  //     await deleteFile.execute({
  //       file_id: fileId,
  //     });

  //     const filesRepository = getRepository(File);

  //     await filesRepository.delete(fileId);

  //     return response.status(200).send();
  //   } catch (error) {
  //     throw new AppError(error);
  //   }
  // }

  public async all(request: Request, response: Response): Promise<Response> {
    const filesRepository = getRepository(File);
    const files = await filesRepository.find({
      where: { active: true },
      order: {
        updated_at: 'DESC',
      },
    });

    return response.json(files);
  }

  public async status(request: Request, response: Response): Promise<Response> {
    const { status } = request.params;

    const filesRepository = getRepository(File);
    const files = await filesRepository.find({
      where: { nm_status: status, active: true },
      order: {
        updated_at: 'DESC',
      },
    });

    return response.json(files);
  }

  public async published(
    request: Request,
    response: Response,
  ): Promise<Response> {}

  public async scheduled(
    request: Request,
    response: Response,
  ): Promise<Response> {}

  public async holding(
    request: Request,
    response: Response,
  ): Promise<Response> {}

  public async archived(
    request: Request,
    response: Response,
  ): Promise<Response> {}
}
