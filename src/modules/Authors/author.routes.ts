import { Router } from "express";
import { AuthorController } from "./author.controller";

const authorRouter = Router();
const authorController = new AuthorController();

// 🔍 Ruta para buscar autores por nombre (query param: /api/authors/search?name=...)
// OJO: Esta ruta debe ir ANTES de '/:id' para que Express no confunda la palabra 'search' con un ID.
authorRouter.get("/search", authorController.searchAuthorsByName);

// ➕ Crear un nuevo autor
authorRouter.post("/", authorController.createAuthor);

// 📋 Obtener todos los autores
authorRouter.get("/", authorController.getAllAuthors);

// 👤 Obtener un autor por su ID
authorRouter.get("/:id", authorController.getAuthorById);

// ✏️ Actualizar un autor por su ID
authorRouter.put("/:id", authorController.updateAuthor);

// 🗑️ Eliminar un autor por su ID
authorRouter.delete("/:id", authorController.deleteAuthor);

export default authorRouter;
