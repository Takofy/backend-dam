import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';

import CreateStoreService from '@modules/companies/services/CreateStoreService';

import Store from '@modules/companies/infra/typeorm/entities/Store';

export default class StoresController {
  public async index(request: Request, response: Response): Promise<Response> {
    const storesRepository = getRepository(Store);

    const stores = await storesRepository.find();

    return response.json(stores);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const storeCnpj = request.params.company_cnpj;

    const storesRepository = getRepository(Store);

    const store = await storesRepository.find({
      select: [
        'nm_corporate_name',
        'nm_fantasy_name',
        'nm_initials',
        'nm_primary_color',
        'nm_secondary_color',
        'nm_tertiary_color',
        'path_logo',
        'path_backgorund',
        'nm_facebook',
        'nm_instagram',
      ],
      where: { nr_cnpj: storeCnpj, active: true },
    });

    return response.json(store);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      nm_corporate_name,
      nm_fantasy_name,
      nm_initials,
      nr_cnpj,
      nr_inscricao_estadual,
      nr_ccm,
      dt_born,
      type_company,
      nm_primary_color,
      nm_secondary_color,
      nm_tertiary_color,
      path_logo,
      path_backgorund,
      nm_facebook,
      nm_instagram,
      nm_linkedin,
      nm_twitter,
      nm_youtube,
      nm_tiktok,
      active,
    } = request.body;

    const createStore = container.resolve(CreateStoreService);

    const store = await createStore.execute({
      nm_corporate_name,
      nm_fantasy_name,
      nm_initials,
      nr_cnpj,
      nr_inscricao_estadual,
      nr_ccm,
      dt_born,
      type_company,
      nm_primary_color,
      nm_secondary_color,
      nm_tertiary_color,
      path_logo,
      path_backgorund,
      nm_facebook,
      nm_instagram,
      nm_linkedin,
      nm_twitter,
      nm_youtube,
      nm_tiktok,
      active,
    });

    return response.json(store);
  }
}
