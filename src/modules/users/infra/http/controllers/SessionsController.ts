import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, username, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      username,
      password,
    });

    /** Nobrega Atention Point: operand of delete must be optional ->
      /* like: password?: string;
      /* maybe don't pass any data on create user
      */
    delete user.password;

    return response.json({ user, token });
  }
}
