import { getRepository, Repository } from 'typeorm';

import IUserStoreRepository from '@modules/users/repositories/IUserStoreRepository';
import ICreateUserStoreDTO from '@modules/users/dtos/ICreateUserStoreDTO';

import UserStore from '../entities/UserStore';

class UserStoreRepository implements IUserStoreRepository {
  private ormRepository: Repository<UserStore>;

  constructor() {
    this.ormRepository = getRepository(UserStore);
  }

  public async findByUserAndStoreIds(
    user_id: string,
    store_id: string,
  ): Promise<UserStore | undefined> {
    const userStore = await this.ormRepository.findOne({
      where: { user_id, store_id },
    });

    return userStore;
  }

  // public async findByStoreId(store_id: string): Promise<UserStore | undefined> {
  //   const userStore = await this.ormRepository.findOne({ where: { store_id } });

  //   return userStore;
  // }

  public async create(userStoreData: ICreateUserStoreDTO): Promise<UserStore> {
    const userStore = this.ormRepository.create(userStoreData);

    await this.ormRepository.save(userStore);

    return userStore;
  }

  public async save(userStore: UserStore): Promise<UserStore> {
    return this.ormRepository.save(userStore);
  }
}

export default UserStoreRepository;
