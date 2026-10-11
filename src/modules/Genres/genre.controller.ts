import { Request, Response } from "express";
import { GenreService } from "./genre.service";

export class GenreController {
  private service: GenreService;

  constructor() {
    this.service = new GenreService();
  }

  // Crear un nuevo género
  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const newGenre = await this.service.createGenre(req.body);
      res.status(201).json(newGenre);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Obtener todos los géneros
  public getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const genres = await this.service.getAllGenres();
      res.status(200).json(genres);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Obtener un género por ID
  public getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const genre = await this.service.getGenreById(req.params.id);
      res.status(200).json(genre);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };

  // Actualizar un género por ID
  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedGenre = await this.service.updateGenre(req.params.id, req.body);
      res.status(200).json(updatedGenre);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Eliminar un género por ID
  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedGenre = await this.service.deleteGenre(req.params.id);
      res.status(200).json({ message: "Género eliminado correctamente", deletedGenre });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };

  // Buscar géneros por nombre
  public searchByName = async (req: Request, res: Response): Promise<void> => {
    try {
      const name = req.query.name as string;
      const genres = await this.service.searchGenresByName(name);
      res.status(200).json(genres);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
