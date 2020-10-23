import UserStore from '../infra/typeorm/entities/UserStore';
import ICreateUserStoreDTO from '../dtos/ICreateUserStoreDTO';

export default interface IUserStoreRepository {
  findByUserAndStoreIds(
    user_id: string,
    store_id: string,
  ): Promise<UserStore | undefined>;
  // findByStoreId(store_id: string): Promise<UserStore | undefined>;
  create(data: ICreateUserStoreDTO): Promise<UserStore>;
  save(userStore: UserStore): Promise<UserStore>;
}
