import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IStoresRepository from '@modules/companies/repositories/IStoresRepository';
import StoresRepository from '@modules/companies/infra/typeorm/repositories/StoresRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IUserStoreRepository from '@modules/users/repositories/IUserStoreRepository';
import UserStoreRepository from '@modules/users/infra/typeorm/repositories/UserStoreRepository';

import ICampaignsRepository from '@modules/companies/repositories/ICampaignsRepository';
import CampaignsRepository from '@modules/companies/infra/typeorm/repositories/CampaignsRepository';

import IFilesRepository from '@modules/companies/repositories/IFilesRepository';
import FilesRepository from '@modules/companies/infra/typeorm/repositories/FilesRepository';

import ITagsRepository from '@modules/companies/repositories/ITagsRepository';
import TagsRepository from '@modules/companies/infra/typeorm/repositories/TagsRepository';

import IFileTagsRepository from '@modules/companies/repositories/IFileTagsRepository';
import FileTagsRepository from '@modules/companies/infra/typeorm/repositories/FileTagsRepository';

container.registerSingleton<IStoresRepository>(
  'StoresRepository',
  StoresRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
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

container.registerSingleton<ITagsRepository>('TagsRepository', TagsRepository);

container.registerSingleton<IFileTagsRepository>(
  'FileTagsRepository',
  FileTagsRepository,
);
