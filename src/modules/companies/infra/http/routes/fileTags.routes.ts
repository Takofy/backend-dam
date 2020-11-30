import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import FileTagsController from '../controllers/FileTagsController';

const fileTagsRouter = Router();
const fileTagsController = new FileTagsController();

fileTagsRouter.use(ensureAuthenticated);

fileTagsRouter.get('/', fileTagsController.index);

fileTagsRouter.get('/:file_id', fileTagsController.show);

fileTagsRouter.post('/', fileTagsController.create);

fileTagsRouter.delete('/', fileTagsController.delete);

export default fileTagsRouter;
