import express from 'express';
import { Routes } from './routes/routes.js';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    //this.server.use(routes);
    this.server.use('/TipoPost', Routes.TipoPostsRoutes);
    this.server.use('/Post', Routes.PostsRoutes);
    this.server.use('/ScreenPost', Routes.ScreenPostsRoutes);
    this.server.use('/SeccionPost', Routes.SeccionPostsRoutes);
  }
}

export default new App().server;
