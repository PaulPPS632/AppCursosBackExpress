import { Router } from "express";
import EntidadController from "../../controllers/ursers/EntidadController.js";

const EntidadRoutes = Router();

// Ruta para obtener todas las entidades
EntidadRoutes.get("/", EntidadController.getAll);

// Ruta para obtener una entidad por su ID
EntidadRoutes.get("/:id", EntidadController.getById);

// // Ruta para actualizar una entidad existente
EntidadRoutes.put("/:id", EntidadController.update);

// // Ruta para crear una nueva entidad
EntidadRoutes.post("/", EntidadController.create);

// // Ruta para eliminar una entidad
//EntidadRoutes.delete("/:id", EntidadController.delete);

// Ruta para el login de una entidad
EntidadRoutes.post("/login", EntidadController.login);

export default EntidadRoutes;
