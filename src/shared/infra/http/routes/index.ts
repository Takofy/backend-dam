import { Router } from 'express';

import storesRouter from '@modules/companies/infra/http/routes/stores.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import userStoreRouter from '@modules/users/infra/http/routes/userStore.routes';
import campaignsRouter from '@modules/companies/infra/http/routes/campaigns.routes';
import filesRouter from '@modules/companies/infra/http/routes/files.routes';
import dashboardRouter from '@modules/companies/infra/http/routes/dashboard.routes';
import tagsRouter from '@modules/companies/infra/http/routes/tags.routes';
import fileTagsRouter from '@modules/companies/infra/http/routes/fileTags.routes';
import filesDownloadRouter from '@modules/companies/infra/http/routes/filesDownload.routes';

const routes = Router();

routes.use('/stores', storesRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/user-store', userStoreRouter);
routes.use('/campaigns', campaignsRouter);
routes.use('/files', filesRouter);
routes.use('/dashboard', dashboardRouter);
routes.use('/tags', tagsRouter);
routes.use('/file-tags', fileTagsRouter);
routes.use('/download', filesDownloadRouter);

export default routes;
