import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  username: string;
  email: string;
  password: string;
  nm_fullname: string;
  nr_document: number;
  nm_sex: string;
  dt_born: Date;
  path_avatar: string;
  active: boolean;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hahsProvider: IHashProvider,
  ) {}

  public async execute({
    username,
    email,
    password,
    nm_fullname,
    nr_document,
    nm_sex,
    dt_born,
    path_avatar,
    active,
  }: IRequest): Promise<User> {
    const checkEmailExists = await this.usersRepository.findByEmail(email);

    const checkUsernameExists = await this.usersRepository.findByUsername(
      username,
    );

    if (checkEmailExists) {
      throw new AppError('Email já cadastrado.');
    }

    if (checkUsernameExists) {
      throw new AppError('O nome de usuário já está em uso.');
    }

    const hashedPassword = await this.hahsProvider.generateHash(password);

    const user = await this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
      nm_fullname,
      nr_document,
      nm_sex,
      dt_born,
      path_avatar,
      active,
    });

    return user;
  }
}

export default CreateUserService;
