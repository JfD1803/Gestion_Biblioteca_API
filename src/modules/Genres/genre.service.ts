import { GenreRepository } from "./genre.repository";
import { IGenre } from "./genre.model";

export class GenreService {
  private repository: GenreRepository;

  constructor() {
    this.repository = new GenreRepository();
  }

  // Crear un nuevo género
  async createGenre(data: Partial<IGenre>): Promise<IGenre> {
    if (!data.name || data.name.trim() === "") {
      throw new Error("El nombre del género es obligatorio.");
    }

    // Opcional: Validar si ya existe un género con el mismo nombre para evitar duplicados
    const existingGenre = await this.repository.findByName(data.name);
    if (existingGenre) {
      throw new Error(`Ya existe un género registrado con el nombre '${data.name}'.`);
    }

    return await this.repository.create(data);
  }

  // Obtener todos los géneros
  async getAllGenres(): Promise<IGenre[]> {
    return await this.repository.findAll();
  }

  // Obtener un género por su ID
  async getGenreById(id: string): Promise<IGenre> {
    const foundGenre = await this.repository.findById(id);
    if (!foundGenre) {
      throw new Error(`El género con ID '${id}' no fue encontrado.`);
    }
    return foundGenre;
  }

  // Actualizar un género por ID
  async updateGenre(id: string, data: Partial<IGenre>): Promise<IGenre> {
    // Validar que el género exista antes de actualizar
    await this.getGenreById(id);

    const updatedGenre = await this.repository.update(id, data);
    if (!updatedGenre) {
      throw new Error("No se pudo actualizar el género.");
    }
    return updatedGenre;
  }

  // Eliminar un género por ID
  async deleteGenre(id: string): Promise<IGenre> {
    // Validar que el género exista antes de eliminar
    await this.getGenreById(id);

    const deletedGenre = await this.repository.delete(id);
    if (!deletedGenre) {
      throw new Error("No se pudo eliminar el género.");
    }
    return deletedGenre;
  }

  // Búsqueda de género por nombre exacto o parcial
  async searchGenresByName(name: string): Promise<IGenre[]> {
    if (!name || name.trim() === "") {
      return [];
    }
    return await this.repository.findByName(name);
  }
}
