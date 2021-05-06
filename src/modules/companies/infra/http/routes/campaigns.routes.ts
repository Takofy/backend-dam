import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CampaignsController from '../controllers/CampaignsController';

const campaignsRouter = Router();
const campaignsController = new CampaignsController();

const upload = multer(uploadConfig.multer);

campaignsRouter.use(ensureAuthenticated);

campaignsRouter.get('/', campaignsController.show);

campaignsRouter.post(
  '/',
  upload.single('campaign-img'),
  campaignsController.create,
);

campaignsRouter.put('/:campaign_id', campaignsController.update);

campaignsRouter.post('/delete', campaignsController.delete);

// campaignsRouter.delete('/:campaign_id', campaignsController.delete);

export default campaignsRouter;
