import { Request, Response } from "express";
import { BookService } from "./book.service";

export class BookController {
  private service: BookService;

  constructor() {
    this.service = new BookService();
  }

  // POST /api/v1/books -> Crear un libro
  createBook = async (req: Request, res: Response): Promise<void> => {
    try {
      const bookData = req.body;
      const newBook = await this.service.createBook(bookData);
      res.status(201).json({
        success: true,
        data: newBook,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Error al crear el libro",
      });
    }
  };

  // GET /api/v1/books -> Obtener todos los libros
  getAllBooks = async (_req: Request, res: Response): Promise<void> => {
    try {
      const books = await this.service.getAllBooks();
      res.status(200).json({
        success: true,
        count: books.length,
        data: books,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "Error al obtener los libros",
      });
    }
  };

  // GET /api/v1/books/:id -> Obtener un libro por su ID
  getBookById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const foundBook = await this.service.getBookById(id);
      res.status(200).json({
        success: true,
        data: foundBook,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || "Libro no encontrado",
      });
    }
  };

  // PUT /api/v1/books/:id -> Actualizar un libro por ID
  updateBook = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedBook = await this.service.updateBook(id, updateData);
      res.status(200).json({
        success: true,
        data: updatedBook,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Error al actualizar el libro",
      });
    }
  };

  // DELETE /api/v1/books/:id -> Eliminar un libro por ID
  deleteBook = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deletedBook = await this.service.deleteBook(id);
      res.status(200).json({
        success: true,
        message: "Libro eliminado correctamente",
        data: deletedBook,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || "Error al eliminar el libro",
      });
    }
  };

  // GET /api/v1/books/search?title=... -> Búsqueda parcial por título
  searchBooksByTitle = async (req: Request, res: Response): Promise<void> => {
    try {
      const title = req.query.title as string;
      const books = await this.service.searchBooksByTitle(title);
      res.status(200).json({
        success: true,
        count: books.length,
        data: books,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Error al realizar la búsqueda de libros",
      });
    }
  };

  // GET /api/v1/books/author/:authorId -> Obtener libros por ID de autor
  getBooksByAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
      const { authorId } = req.params;
      const books = await this.service.getBooksByAuthor(authorId);
      res.status(200).json({
        success: true,
        count: books.length,
        data: books,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Error al buscar libros por autor",
      });
    }
  };
}
