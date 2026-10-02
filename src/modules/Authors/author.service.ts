import { AuthorRepository } from "./author.repository";
import { IAuthor } from "./author.model";

export class AuthorService {
  private repository: AuthorRepository;

  constructor() {
    this.repository = new AuthorRepository();
  }

  async createAuthor(data: Partial<IAuthor>): Promise<IAuthor> {
    // 1. Regla de negocio: validar que tenga un nombre
    if (!data.name) {
      throw new Error("El nombre del autor es obligatorio.");
    }

    // 2. Regla de negocio: verificar si ya existe un autor con el mismo nombre
    const existingAuthors = await this.repository.findByName(data.name);
    if (existingAuthors.length > 0) {
      throw new Error(`Ya existe un autor registrado con el nombre '${data.name}'.`);
    }

    return await this.repository.create(data);
  }

  async getAllAuthors(): Promise<IAuthor[]> {
    return await this.repository.findAll();
  }

  async getAuthorById(id: string): Promise<IAuthor> {
    const foundAuthor = await this.repository.findById(id);
    if (!foundAuthor) {
      throw new Error(`Autor con el ID ${id} no fue encontrado.`);
    }
    return foundAuthor;
  }

  async updateAuthor(id: string, data: Partial<IAuthor>): Promise<IAuthor> {
    // Validar primero si existe antes de intentar actualizar
    await this.getAuthorById(id);
    const updatedAuthor = await this.repository.update(id, data);
    
    if (!updatedAuthor) {
      throw new Error("No se pudo actualizar el autor.");
    }
    return updatedAuthor;
  }

  async deleteAuthor(id: string): Promise<IAuthor> {
    // Validar primero si existe antes de eliminar
    await this.getAuthorById(id);
    const deletedAuthor = await this.repository.delete(id);
    
    if (!deletedAuthor) {
      throw new Error("No se pudo eliminar el autor.");
    }
    return deletedAuthor;
  }

  async searchAuthorsByName(term: string): Promise<IAuthor[]> {
    if (!term || term.trim() === "") {
      return [];
    }
    return await this.repository.searchByName(term);
  }
}
