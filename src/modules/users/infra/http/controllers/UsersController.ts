import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      username,
      email,
      password,
      nm_fullname,
      nr_document,
      nm_sex,
      dt_born,
      path_avatar,
      active,
    } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      username,
      email,
      password,
      nm_fullname,
      nr_document,
      nm_sex,
      dt_born,
      path_avatar,
      active,
    });

    /** Nobrega Atention Point: operand of delete must be optional ->
      /* like: password?: string;
      /* maybe don't pass any data on create user
      */
    delete user.password;

    return response.json(user);
  }
}
