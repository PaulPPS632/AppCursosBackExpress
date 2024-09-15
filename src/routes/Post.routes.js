import { Router } from 'express';
import multer from "multer";
import PostController from '../controllers/PostsController.js';
const PostsRoutes = new Router();
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname); // Generar nombre único para el archivo
    },
  });
const upload = multer({ storage });
PostsRoutes.get('/', PostController.GetAll);
PostsRoutes.get('/:id', PostController.GetById);
PostsRoutes.get('/Screens/:id', PostController.GetScreens);
PostsRoutes.get('/FirstScreen/:id', PostController.GetFirstScreen);
PostsRoutes.post('/', upload.single('image'), PostController.create);
PostsRoutes.put('/:id', upload.single('image'), PostController.update);
PostsRoutes.delete('/:id', PostController.delete);

export default PostsRoutes;
