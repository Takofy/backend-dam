import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import CreateFileTagService from '@modules/companies/services/CreateFileTagService';

import FileTags from '@modules/companies/infra/typeorm/entities/FileTags';
import Tag from '@modules/companies/infra/typeorm/entities/Tag';
import { idText } from 'typescript';

export default class FileTagsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const tagsRepository = getRepository(FileTags);

    const tags = await tagsRepository.find();

    return response.json(tags);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const fileId = request.params.file_id;
      const fileTagsRepository = getRepository(FileTags);
      const filetags = await fileTagsRepository
        .createQueryBuilder('ft')
        .leftJoinAndSelect(Tag, 'tag', 'tag.id = ft.tag_id')
        .where(`ft.file_id = '${fileId}'`)
        .select(['tag.id', 'tag.nm_tag'])
        .getRawMany();

      if (!filetags) {
        throw new AppError('Não foram encontradas Tags para esse ativo.');
      }

      return response.json(filetags);
    } catch (error) {
      throw new AppError(error);
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { tag_id } = request.body;

    const fileIds = request.body.files;

    const allFiles = await Promise.all(
      fileIds.map(async file => {
        const newData = { file_id: file, tag_id, active: true };

        const createFileTag = container.resolve(CreateFileTagService);

        const fileTag = createFileTag.execute(newData);

        return await fileTag;
      }),
    );

    return response.status(200).json(allFiles);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const fileTagId = request.params.filetag_id;

    try {
      const fileTagsRepository = getRepository(FileTags);

      await fileTagsRepository.delete(fileTagId);

      return response.status(200).send();
    } catch (error) {
      throw new AppError(error);
    }
  }
}
