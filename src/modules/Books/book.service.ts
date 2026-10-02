import { BookRepository } from "./book.repository";
import { IBook } from "./book.model";

export class BookService {
  private repository: BookRepository;

  constructor() {
    this.repository = new BookRepository();
  }

  // Crear un nuevo libro
  async createBook(data: Partial<IBook>): Promise<IBook> {
    if (!data.title) {
      throw new Error("El título del libro es obligatorio.");
    }

    if (!data.authorId) {
      throw new Error("El ID del autor (authorId) es obligatorio para asociar el libro.");
    }

    // Regla opcional: evitar duplicados exactos por título
    const existingBooks = await this.repository.findBytitle(data.title);
    if (existingBooks.length > 0) {
      throw new Error(`Ya existe un libro registrado con el título '${data.title}'.`);
    }

    return await this.repository.create(data);
  }

  // Obtener todos los libros
  async getAllBooks(): Promise<IBook[]> {
    return await this.repository.findAll();
  }

  // Obtener un libro por su ID
  async getBookById(id: string): Promise<IBook> {
    const foundBook = await this.repository.findById(id);
    if (!foundBook) {
      throw new Error(`El libro con ID '${id}' no fue encontrado.`);
    }
    return foundBook;
  }

  // Actualizar un libro por ID
  async updateBook(id: string, data: Partial<IBook>): Promise<IBook> {
    // Validar existencia previa
    await this.getBookById(id);

    const updatedBook = await this.repository.update(id, data);
    if (!updatedBook) {
      throw new Error("No se pudo actualizar el libro.");
    }
    return updatedBook;
  }

  // Eliminar un libro por ID
  async deleteBook(id: string): Promise<IBook> {
    // Validar existencia previa
    await this.getBookById(id);

    const deletedBook = await this.repository.delete(id);
    if (!deletedBook) {
      throw new Error("No se pudo eliminar el libro.");
    }
    return deletedBook;
  }

  // Búsqueda parcial por título
  async searchBooksByTitle(term: string): Promise<IBook[]> {
    if (!term || term.trim() === "") {
      return [];
    }
    return await this.repository.searchByTitle(term);
  }

  // Obtener libros por ID de autor
  async getBooksByAuthor(authorId: string): Promise<IBook[]> {
    if (!authorId) {
      throw new Error("El ID del autor es requerido para realizar la búsqueda.");
    }
    return await this.repository.findByAuthorId(authorId);
  }
}
