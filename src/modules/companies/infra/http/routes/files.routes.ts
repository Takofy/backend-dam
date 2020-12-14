import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import FilesController from '../controllers/FilesController';

const filesRouter = Router();
const filesController = new FilesController();
const upload = multer(uploadConfig.multer);

filesRouter.use(ensureAuthenticated);

filesRouter.get('/:campaign_id', filesController.index);

filesRouter.get('/file/:file_id', filesController.show);

filesRouter.post(
  '/',
  ensureAuthenticated,
  upload.array('file'),
  filesController.create,
);

filesRouter.put('/', filesController.update);

filesRouter.delete('/:file_id', filesController.delete);

export default filesRouter;
