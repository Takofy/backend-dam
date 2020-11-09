import { getRepository, Repository } from 'typeorm';

import IStoresRepository from '@modules/companies/repositories/IStoresRepository';
import ICreateStoreDTO from '@modules/companies/dtos/ICreateStoreDTO';

import Store from '../entities/Store';

class StoresRepository implements IStoresRepository {
  private ormRepository: Repository<Store>;

  constructor() {
    this.ormRepository = getRepository(Store);
  }

  public async findByName(
    nr_cnpj: number,
    nm_fantasy_name: string,
  ): Promise<Store | undefined> {
    // Nobrega attention point - Alterei o where apra array para inserir OR ao invés de AND
    const findStore = await this.ormRepository.findOne({
      where: [{ nr_cnpj }, { nm_fantasy_name }],
    });

    return findStore;
  }

  public async create({
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
  }: ICreateStoreDTO): Promise<Store> {
    const store = this.ormRepository.create({
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

    await this.ormRepository.save(store);

    return store;
  }
}

export default StoresRepository;
