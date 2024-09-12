import { Router } from 'express';
import TipoPostsController from '../controllers/TipoPostsController.js';

const TipoPostsRoutes = new Router();

// Add TipoPostRoutes
TipoPostsRoutes.get('/', TipoPostsController.GetAll);
TipoPostsRoutes.get('/:id', TipoPostsController.GetById);
TipoPostsRoutes.post('/', TipoPostsController.create);
TipoPostsRoutes.put('/:id', TipoPostsController.update);
TipoPostsRoutes.delete('/:id', TipoPostsController.delete);

export default TipoPostsRoutes;
