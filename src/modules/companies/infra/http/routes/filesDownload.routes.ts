import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import FilesDownloadController from '../controllers/FilesDownloadController';

const filesDownloadRouter = Router();
const filesDownloadController = new FilesDownloadController();

filesDownloadRouter.use(ensureAuthenticated);

filesDownloadRouter.post('/', filesDownloadController.index);

export default filesDownloadRouter;
