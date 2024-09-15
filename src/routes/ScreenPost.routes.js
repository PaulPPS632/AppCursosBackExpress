import { Router } from "express";

import ScreenPostsController from "../controllers/ScreenPostsController.js";
import multer from "multer";
const ScreenPostsRoutes = new Router();

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Generar nombre único para el archivo
  },
});

const upload = multer({ storage });

ScreenPostsRoutes.get("/", ScreenPostsController.GetAll);
ScreenPostsRoutes.get("/:id", ScreenPostsController.GetById);
ScreenPostsRoutes.post("/", ScreenPostsController.create);
ScreenPostsRoutes.put("/:id", upload.single('image'), ScreenPostsController.update);
ScreenPostsRoutes.delete("/:id", ScreenPostsController.delete);

export default ScreenPostsRoutes;
