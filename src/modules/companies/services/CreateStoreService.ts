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
  type_company: string;
  nm_primary_color: string;
  nm_secondary_color: string;
  nm_tertiary_color: string;
  path_logo: string;
  path_backgorund: string;
  nm_facebook: string;
  nm_instagram: string;
  nm_linkedin: string;
  nm_twitter: string;
  nm_youtube: string;
  nm_tiktok: string;
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
      type_company,
      active,
    });

    return store;
  }
}

export default CreateStoreService;
