import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

import UserStore from '@modules/users/infra/typeorm/entities/UserStore';
import User from '@modules/users/infra/typeorm/entities/User';
import Store from '@modules/companies/infra/typeorm/entities/Store';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, username, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      username,
      password,
    });

    const userStoreRepository = getRepository(UserStore);

    const store = await userStoreRepository
      .createQueryBuilder('us')
      .leftJoinAndSelect(Store, 'store', 'store.id = us.store_id')
      .where(`us.user_id = '${user.id}'`)
      .select('store')
      .getRawMany();

    /** Nobrega Atention Point: operand of delete must be optional ->
      /* like: password?: string;
      /* maybe don't pass any data on create user
      /* Solution: {select: false} in password Entity (but this block session auth)
      */
    delete user.password;

    return response.json({ user, store, token });
  }
}
