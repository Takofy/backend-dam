import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserStoreService from '@modules/users/services/CreateUserStoreService';

export default class UserStoreController {
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
