import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import StoresController from '../controllers/StoresController';

const storesRouter = Router();
const storesController = new StoresController();

storesRouter.use(ensureAuthenticated);

storesRouter.get('/', storesController.index);

storesRouter.get('/:store_id', storesController.show);

storesRouter.post('/', storesController.create);

export default storesRouter;
