import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CampaignsController from '../controllers/CampaignsController';

const campaignsRouter = Router();
const campaignsController = new CampaignsController();

campaignsRouter.use(ensureAuthenticated);

campaignsRouter.get('/', campaignsController.show);

campaignsRouter.post('/', campaignsController.create);

export default campaignsRouter;
