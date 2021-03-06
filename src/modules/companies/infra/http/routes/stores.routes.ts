import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import StoresController from '../controllers/StoresController';

const storesRouter = Router();
const storesController = new StoresController();

storesRouter.get('/', ensureAuthenticated, storesController.index);

storesRouter.get('/:company_cnpj', storesController.show);

storesRouter.post('/', ensureAuthenticated, storesController.create);

export default storesRouter;
