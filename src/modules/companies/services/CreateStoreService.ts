import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Store from '../infra/typeorm/entities/Store';
import IStoresRepository from '../repositories/IStoresRepository';

interface IRequest {
  nm_corporate_name: string;
  nm_fantasy_name: string;
  nm_initials: string;
  nr_cnpj: number;
  nr_inscricao_estadual: number;
  nr_ccm: number;
  dt_born: Date;
  id_company_owner: string;
  type_company: string;
  active: boolean;
}

@injectable()
class CreateStoreService {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,
  ) {}

  public async execute({
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
  }: IRequest): Promise<Store> {
    const findStoreSameName = await this.storesRepository.findByName(
      nr_cnpj,
      nm_fantasy_name,
    );

    if (findStoreSameName) {
      throw new AppError('Essa loja já existe.');
    }

    const store = await this.storesRepository.create({
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

    return store;
  }
}

export default CreateStoreService;
