import { v4 as uuid } from 'uuid';

import IStoresRepository from '@modules/companies/repositories/IStoresRepository';
import ICreateStoreDTO from '@modules/companies/dtos/ICreateStoreDTO';

import Store from '../../infra/typeorm/entities/Store';

class StoresRepository implements IStoresRepository {
  private stores: Store[] = [];

  public async findByName(
    nr_cnpj: number,
    nm_fantasy_name: string,
  ): Promise<Store | undefined> {
    // Nobrega attention point - conferir lógica de OR para o método find()
    const findStore = this.stores.find(
      store =>
        store.nr_cnpj === nr_cnpj || store.nm_fantasy_name === nm_fantasy_name,
    );

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
    id_company_owner,
    type_company,
    active,
  }: ICreateStoreDTO): Promise<Store> {
    const store = new Store();

    Object.assign(store, {
      id: uuid(),
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

    this.stores.push(store);

    return store;
  }
}

export default StoresRepository;
