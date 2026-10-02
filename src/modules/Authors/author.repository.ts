import { authorModel, Author } from "./author.model"; /* ---> Se importa archivo author.model.ts para usar las exportaciones, no es necesario realizar la importación de ObjectId 
                                                                 debido a que mongoose admisitras los Id's tras bambalinas */

export class AuthorRepository {

  // Crear un nuevo autor
  async create(data:Partial<author>): Promise<author> {
    return await authorModel.create(data);
  }

  // Obtener todos los autores
  async findAll(): Promise<author[]> {
    return await authorModel.find();
  }

  // Actualizar un autor por su  ObjectId
  async findById(id:string): Promise<author | null> {
    return await authorModel.findById(id);
  }

  // Actualizar autor por su ID 
  async update(id: string, data:Partial<author>): Promise<author | null> {
    return await authorModel.findByIdAndUpdate(id, data, { new: true });
  }

  // Eliminar autor por ID
  async delete(id:string): Promise<author | null> {
    return await authorModel.findByIdAndDelete(id);
  }

  // Busqueda exacta con el nombre del autor
  async findByName(name:string): Promise<author[]> {
    return await authorModel.find({ name });
  }

  async searchByName(name:string): Promise<authors[]> {
    return await authorModel.find({
      name: { $regex: name, $options: "i"}
    });
  }
}
