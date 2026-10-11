import { genreModel, IGenre } from "./genre.model"; /* ---> Se importa archivo book.model.ts para usar las exportaciones, no es necesario realizar la importación de ObjectId 
                                                             debido a que mongoose admisitras los Id's tras bambalinas */

export class GenreRepository {

  // Crear un nuevo genero
  async create(data: Partial<IGenre>): Promise<IGenre> {
    return await genreModel.create(data);
  }

  // Obtener todos los generos
  async findAll(): Promise<IGenre[]> {
    return await genreModel.find().populate('authorId');
  }

  // Buscar un genero por su ID
  async findById(id: string): Promise<IGenre | null> {
    return await genreModel.findById(id).populate('authorId bookId');
  }

  // Actualizar genero por su ID 
  async update(id: string, data: Partial<IGenre>): Promise<IGenre | null> {
    return await genreModel.findByIdAndUpdate(id, data, { new: true });
  }

  // Eliminar genero por ID
  async delete(id: string): Promise<IBook | null> {
    return await genreModel.findByIdAndDelete(id);
  }

  // Busqueda exacta con el genero del libro
  async findBytitle(name: string): Promise<IGenre[]> {
    return await genreModel.find({ name }).populate('authorId bookId'); /* --->En mongoose se utiliza el populate para realizar la union de documentos entre 
                                                                   colecciones */
  }

  async searchByTitle(title: string): Promise<IBook[]> {
    return await bookModel.find({
      title: { $regex: title, $options: "i" }
    }).populate('authorId'); // ---> 
  }

  async findByAuthorId(authorId: string): Promise<IBook[]> {
    return await bookModel.find({ authorId }).populate('authorId');
  }
}
