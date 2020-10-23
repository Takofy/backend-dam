import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserStoreRepository from '../repositories/IUserStoreRepository';

import UserStore from '../infra/typeorm/entities/UserStore';

interface IRequest {
  user_id: string;
  store_id: string;
  active: boolean;
}

@injectable()
class CreateUserStoreService {
  constructor(
    @inject('UserStoreRepository')
    private userStoreRepository: IUserStoreRepository,
  ) {}

  public async execute({
    user_id,
    store_id,
    active,
  }: IRequest): Promise<UserStore> {
    const checkUserStoreExists = await this.userStoreRepository.findByUserAndStoreIds(
      user_id,
      store_id,
    );

    // const checkStoreExists = await this.userStoreRepository.findByStoreId(
    //   store_id,
    // );

    if (checkUserStoreExists) {
      throw new AppError('Usuário já pertence à Empresa selecionada.');
    }

    const userStore = await this.userStoreRepository.create({
      user_id,
      store_id,
      active,
    });

    return userStore;
  }
}

export default CreateUserStoreService;
