import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import TagsController from '../controllers/TagsController';

const tagsRouter = Router();
const tagsController = new TagsController();

tagsRouter.use(ensureAuthenticated);

tagsRouter.get('/', tagsController.index);

tagsRouter.get('/:tag_id', tagsController.show);

tagsRouter.post('/', tagsController.create);

tagsRouter.delete('/:tag_id', tagsController.delete);

export default tagsRouter;
