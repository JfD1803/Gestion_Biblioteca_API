import { bookModel, IBook } from "./book.model"; /* ---> Se importa archivo book.model.ts para usar las exportaciones, no es necesario realizar la importación de ObjectId 
                                                             debido a que mongoose admisitras los Id's tras bambalinas */

export class BookRepository {

  // Crear un nuevo libro
  async create(data: Partial<IBook>): Promise<IBook> {
    return await bookModel.create(data);
  }

  // Obtener todos los libros
  async findAll(): Promise<IBook[]> {
    return await bookModel.find().populate('authorId');
  }

  // Buscar un libro por su ID
  async findById(id: string): Promise<IBook | null> {
    return await bookModel.findById(id).populate('authorId');
  }

  // Actualizar libro por su ID 
  async update(id: string, data: Partial<IBook>): Promise<IBook | null> {
    return await bookModel.findByIdAndUpdate(id, data, { new: true });
  }

  // Eliminar libro por ID
  async delete(id: string): Promise<IBook | null> {
    return await bookModel.findByIdAndDelete(id);
  }

  // Busqueda exacta con el nombre del libro
  async findBytitle(title: string): Promise<IBook[]> {
    return await bookModel.find({ title }).populate('authorId'); /* --->En mongoose se utiliza el populate para realizar la union de documentos entre 
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
