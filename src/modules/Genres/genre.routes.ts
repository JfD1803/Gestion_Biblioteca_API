import { Router } from "express";
import { GenreController } from "./genre.controller";

const genreRouter = Router();
const controller = new GenreController();

// Definición de endpoints para Géneros
genreRouter.post("/", controller.create);
genreRouter.get("/", controller.getAll);
genreRouter.get("/search", controller.searchByName); // Ruta de búsqueda por query param (ej: /api/genres/search?name=Fantasía)
genreRouter.get("/:id", controller.getById);
genreRouter.put("/:id", controller.update);
genreRouter.delete("/:id", controller.delete);

export default genreRouter;
