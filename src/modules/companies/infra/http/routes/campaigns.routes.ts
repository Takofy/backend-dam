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

export default campaignsRouter;
