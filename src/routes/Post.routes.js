import { Router } from 'express';
import PostController from '../controllers/PostsController.js';
const PostsRoutes = new Router();

PostsRoutes.get('/', PostController.GetAll);
PostsRoutes.get('/:id', PostController.GetById);
PostsRoutes.get('/Screens/:id', PostController.GetScreens);
PostsRoutes.post('/', PostController.create);
PostsRoutes.put('/:id', PostController.update);
PostsRoutes.delete('/:id', PostController.delete);

export default PostsRoutes;
