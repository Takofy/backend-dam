import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import DashboardController from '../controllers/DashboardController';

const dashboardRouter = Router();
const dashboardController = new DashboardController();

dashboardRouter.use(ensureAuthenticated);

dashboardRouter.get('/', dashboardController.show);

export default dashboardRouter;
