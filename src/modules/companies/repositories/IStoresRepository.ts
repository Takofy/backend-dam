import Store from '../infra/typeorm/entities/Store';
import ICreateStoreDTO from '../dtos/ICreateStoreDTO';

export default interface IStoresRepository {
  create(data: ICreateStoreDTO): Promise<Store>;
  findByName(
    nr_cnpj: number,
    nm_fantasy_name: string,
  ): Promise<Store | undefined>;
}
