import { Router } from 'express';

import storesRouter from '@modules/companies/infra/http/routes/stores.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import userStoreRouter from '@modules/users/infra/http/routes/userStore.routes';
import campaignsRouter from '@modules/companies/infra/http/routes/campaigns.routes';
import filesRouter from '@modules/companies/infra/http/routes/files.routes';

const routes = Router();

routes.use('/stores', storesRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/user-store', userStoreRouter);
routes.use('/campaigns', campaignsRouter);
routes.use('/files', filesRouter);

export default routes;
