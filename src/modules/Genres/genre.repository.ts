import { genreModel, IGenre } from "./genre.model";

export class GenreRepository {

  // Crear un nuevo género
  async create(data: Partial<IGenre>): Promise<IGenre> {
    return await genreModel.create(data);
  }

  // Obtener todos los géneros
  async findAll(): Promise<IGenre[]> {
    return await genreModel.find();
  }

  // Buscar un género por su ID
  async findById(id: string): Promise<IGenre | null> {
    return await genreModel.findById(id);
  }

  // Actualizar género por su ID 
  async update(id: string, data: Partial<IGenre>): Promise<IGenre | null> {
    return await genreModel.findByIdAndUpdate(id, data, { new: true });
  }

  // Eliminar género por ID (retorna IGenre en lugar de IBook)
  async delete(id: string): Promise<IGenre | null> {
    return await genreModel.findByIdAndDelete(id);
  }

  // Búsqueda exacta por el nombre del género
  async findByName(name: string): Promise<IGenre[]> {
    return await genreModel.find({ name });
  }

  // Búsqueda parcial por nombre del género (case-insensitive con regex)
  async searchByName(name: string): Promise<IGenre[]> {
    return await genreModel.find({
      name: { $regex: name, $options: "i" }
    });
  }
}
