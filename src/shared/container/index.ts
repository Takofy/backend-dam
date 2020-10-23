import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IStoresRepository from '@modules/companies/repositories/IStoresRepository';
import StoresRepository from '@modules/companies/infra/typeorm/repositories/StoresRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserStoreRepository from '@modules/users/repositories/IUserStoreRepository';
import UserStoreRepository from '@modules/users/infra/typeorm/repositories/UserStoreRepository';

import ICampaignsRepository from '@modules/companies/repositories/ICampaignsRepository';
import CampaignsRepository from '@modules/companies/infra/typeorm/repositories/CampaignsRepository';

import IFilesRepository from '@modules/companies/repositories/IFilesRepository';
import FilesRepository from '@modules/companies/infra/typeorm/repositories/FilesRepository';

container.registerSingleton<IStoresRepository>(
  'StoresRepository',
  StoresRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserStoreRepository>(
  'UserStoreRepository',
  UserStoreRepository,
);

container.registerSingleton<ICampaignsRepository>(
  'CampaignsRepository',
  CampaignsRepository,
);

container.registerSingleton<IFilesRepository>(
  'FilesRepository',
  FilesRepository,
);
