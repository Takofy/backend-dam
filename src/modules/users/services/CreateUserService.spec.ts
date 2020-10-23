import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
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

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email form another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
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
      createUser.execute({
        username: 'john.doe',
        email: 'john@doe.com',
        password: '123456',
        nm_fullname: 'John Doe',
        nr_document: 10120230344,
        nm_sex: 'M',
        dt_born: new Date(),
        path_avatar: '',
        active: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
