import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import FilesController from '../controllers/FilesController';
import FilesUploadController from '../controllers/FilesUploadController';

const filesRouter = Router();
const filesController = new FilesController();
// const filesUploadController = new FilesUploadController();
const upload = multer(uploadConfig.multer);

filesRouter.get('/:campaign_id', filesController.index);

filesRouter.post(
  '/',
  ensureAuthenticated,
  upload.single('file'),
  filesController.create,
);

// filesRouter.post(
//   '/upload',
//   upload.single('file'),
//   filesUploadController.update,
// );

export default filesRouter;
