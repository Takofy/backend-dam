import { Router } from 'express';

import CampaignsController from '../controllers/CampaignsController';

const campaignsRouter = Router();
const campaignsController = new CampaignsController();

campaignsRouter.get('/', campaignsController.index);

campaignsRouter.get('/:store_id', campaignsController.show);

campaignsRouter.post('/', campaignsController.create);

export default campaignsRouter;
