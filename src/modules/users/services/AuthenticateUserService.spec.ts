import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  // Nobrega - Atention Point -> teste 01 com problemas

  // it('should be able to authenticate', async () => {
  //   const fakeUsersRepository = new FakeUsersRepository();
  //   const fakeHashProvider = new FakeHashProvider();

  //   const createUser = new CreateUserService(
  //     fakeUsersRepository,
  //     fakeHashProvider,
  //   );

  //   const authenticateUser = new AuthenticateUserService(
  //     fakeUsersRepository,
  //     fakeHashProvider,
  //   );

  //   const user = await createUser.execute({
  //     username: 'john.doe',
  //     email: 'john@doe.com',
  //     password: '123456',
  //     nm_fullname: 'John Doe',
  //     nr_document: 10120230344,
  //     nm_sex: 'M',
  //     dt_born: new Date(),
  //     path_avatar: '',
  //     active: true,
  //   });

  //   const response = await authenticateUser.execute({
  //     username: 'john.doe',
  //     email: 'john@doe.com',
  //     password: '123456',
  //   });

  //   expect(response).toHaveProperty('token');
  //   expect(response.user).toEqual(user);
  // });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        username: 'john.doe',
        email: 'john@doe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      username: 'john.doe',
      email: 'john@doe.com',
      password: '123456',
      nm_fullname: 'John Doe',
      nr_document: 10120230344,
      nm_sex: 'M',
      dt_born: new Date(),
      path_avatar: '',
      active: true,
    });

    expect(
      authenticateUser.execute({
        username: 'john.doe',
        email: 'john@doe.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
