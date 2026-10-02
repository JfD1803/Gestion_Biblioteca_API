import { Router } from "express";
import { BookController } from "./book.controller";

const bookRouter = Router();
const bookController = new BookController();

// 🔍 Búsqueda parcial por título (query param: /api/v1/books/search?title=...)
// NOTA: Debe ir antes de '/:id' para evitar conflictos de ruteo en Express
bookRouter.get("/search", bookController.searchBooksByTitle);

// 👤 Obtener libros de un autor específico (/api/v1/books/author/:authorId)
bookRouter.get("/author/:authorId", bookController.getBooksByAuthor);

// ➕ Crear un nuevo libro
bookRouter.post("/", bookController.createBook);

// 📋 Obtener todos los libros
bookRouter.get("/", bookController.getAllBooks);

// 📖 Obtener un libro por su ID
bookRouter.get("/:id", bookController.getBookById);

// ✏️ Actualizar un libro por ID
bookRouter.put("/:id", bookController.updateBook);

// 🗑️ Eliminar un libro por ID
bookRouter.delete("/:id", bookController.deleteBook);

export default bookRouter;
