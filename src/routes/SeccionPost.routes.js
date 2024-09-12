import { Router } from 'express';
import SeccionPostsController from '../controllers/SeccionPostsController.js';

const SeccionPostsRoutes = new Router();

SeccionPostsRoutes.get('/', SeccionPostsController.GetAll);
SeccionPostsRoutes.get('/:id', SeccionPostsController.GetById);
SeccionPostsRoutes.post('/', SeccionPostsController.create);
SeccionPostsRoutes.put('/:id', SeccionPostsController.update);
SeccionPostsRoutes.delete('/:id', SeccionPostsController.delete);
export default SeccionPostsRoutes;
