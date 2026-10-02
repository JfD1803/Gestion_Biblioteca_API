import { Request, Response } from "express";
import { AuthorService } from "./author.service";

export class AuthorController {
  private service: AuthorService;

  constructor() {
    this.service = new AuthorService();
  }

  // POST /api/authors
  createAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
      const authorData = req.body;
      const newAuthor = await this.service.createAuthor(authorData);
      res.status(201).json({
        success: true,
        data: newAuthor,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Error al crear el autor",
      });
    }
  };

  // GET /api/authors
  getAllAuthors = async (req: Request, res: Response): Promise<void> => {
    try {
      const authors = await this.service.getAllAuthors();
      res.status(200).json({
        success: true,
        count: authors.length,
        data: authors,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "Error al obtener los autores",
      });
    }
  };

  // GET /api/authors/:id
  getAuthorById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const author = await this.service.getAuthorById(id);
      res.status(200).json({
        success: true,
        data: author,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || "Autor no encontrado",
      });
    }
  };

  // PUT /api/authors/:id
  updateAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedAuthor = await this.service.updateAuthor(id, updateData);
      res.status(200).json({
        success: true,
        data: updatedAuthor,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Error al actualizar el autor",
      });
    }
  };

  // DELETE /api/authors/:id
  deleteAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deletedAuthor = await this.service.deleteAuthor(id);
      res.status(200).json({
        success: true,
        message: "Autor eliminado correctamente",
        data: deletedAuthor,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || "Error al eliminar el autor",
      });
    }
  };

  // GET /api/authors/search?name=...
  searchAuthorsByName = async (req: Request, res: Response): Promise<void> => {
    try {
      const name = req.query.name as string;
      const authors = await this.service.searchAuthorsByName(name);
      res.status(200).json({
        success: true,
        count: authors.length,
        data: authors,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Error al buscar autores",
      });
    }
  };
}
