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
    const storeId = request.params.store_id;

    const storesRepository = getRepository(Store);

    const stores = await storesRepository.find({
      where: { id_company_owner: storeId },
    });

    return response.json(stores);
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
      id_company_owner,
      type_company,
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
      id_company_owner,
      type_company,
      active,
    });

    return response.json(store);
  }
}
