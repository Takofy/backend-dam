import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';

import CreateUserStoreService from '@modules/users/services/CreateUserStoreService';

import UserStore from '@modules/users/infra/typeorm/entities/UserStore';
import User from '@modules/users/infra/typeorm/entities/User';
import Store from '@modules/companies/infra/typeorm/entities/Store';

export default class UserStoreController {
  public async index(request: Request, response: Response): Promise<Response> {
    const userStoreRepository = getRepository(UserStore);

    const userStore = await userStoreRepository.find();

    return response.json(userStore);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.params.user_id;

    const userStoreRepository = getRepository(UserStore);

    // const storeId = await userStoreRepository
    //   .createQueryBuilder('si')
    //   .where(`si.user_id = '${userId}'`)
    //   .select('si.store_id')
    //   .getRawMany();

    // const userStore = await userStoreRepository
    //   .createQueryBuilder('us')
    //   .leftJoinAndSelect(Store, 'store', 'store.id = us.store_id')
    //   .leftJoinAndSelect(User, 'user', 'user.id = us.user_id')
    //   .where(`us.user_id = '${userId}'`)
    //   .select(['store', 'user'])
    //   .getRawMany();

    const store = await userStoreRepository
      .createQueryBuilder('us')
      .leftJoinAndSelect(Store, 'store', 'store.id = us.store_id')
      .leftJoinAndSelect(User, 'user', 'user.id = us.user_id')
      .where(`us.user_id = '${userId}'`)
      .select('store')
      .getRawMany();

    const user = await userStoreRepository
      .createQueryBuilder('us')
      .leftJoinAndSelect(Store, 'store', 'store.id = us.store_id')
      .leftJoinAndSelect(User, 'user', 'user.id = us.user_id')
      .where(`us.user_id = '${userId}'`)
      .select('user')
      .getRawMany();

    return response.json({ user, store });
  }

  // This Create a new User & UserXStore Registers
  public async create(request: Request, response: Response): Promise<Response> {
    // This get User params (don't forget "store_id" is it below, after create user)
    const { user_id, store_id, active } = request.body;

    // This call to CreateUserService that uses repository and typeorm to create a new User
    const createUserStore = container.resolve(CreateUserStoreService);

    const userStore = await createUserStore.execute({
      user_id,
      store_id,
      active,
    });

    return response.json({ userStore });
  }
}
