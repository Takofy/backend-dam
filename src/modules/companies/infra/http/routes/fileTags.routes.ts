import { Router } from 'express';

import FileTagsController from '../controllers/FileTagsController';

const fileTagsRouter = Router();
const fileTagsController = new FileTagsController();

fileTagsRouter.get('/', fileTagsController.index);

fileTagsRouter.get('/:file_id', fileTagsController.show);

fileTagsRouter.post('/', fileTagsController.create);

export default fileTagsRouter;
