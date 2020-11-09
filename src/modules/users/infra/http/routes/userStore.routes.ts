import { Router } from 'express';

import UserStoreController from '../controllers/UserStoreController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userStoreRouter = Router();
const userStoreController = new UserStoreController();

userStoreRouter.use(ensureAuthenticated);

// userStoreRouter.get('/', userStoreController.index);

userStoreRouter.get('/:user_id', userStoreController.show);

userStoreRouter.post('/', userStoreController.create);

export default userStoreRouter;
