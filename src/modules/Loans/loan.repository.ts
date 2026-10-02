import { loanModel, ILoan } from "./loan.model";

export class LoanRepository {

  // Crear un nuevo préstamo
  async create(data: Partial<ILoan>): Promise<ILoan> {
    return await loanModel.create(data);
  }

  // Obtener todos los préstamos con la información del libro
  async findAll(): Promise<ILoan[]> {
    return await loanModel.find().populate("bookId");
  }

  // Buscar un préstamo por ID
  async findById(id: string): Promise<ILoan | null> {
    return await loanModel.findById(id).populate("bookId");
  }

  // Actualizar un préstamo por ID
  async update(id: string, data: Partial<ILoan>): Promise<ILoan | null> {
    return await loanModel.findByIdAndUpdate(id, data, { new: true }).populate("bookId");
  }

  // Eliminar un préstamo por ID
  async delete(id: string): Promise<ILoan | null> {
    return await loanModel.findByIdAndDelete(id);
  }

  // Buscar préstamos por nombre de usuario
  async findByUserName(userName: string): Promise<ILoan[]> {
    return await loanModel.find({
      userName: { $regex: userName, $options: "i" }
    }).populate("bookId");
  }

  // Buscar préstamos activos (no devueltos)
  async findActiveLoans(): Promise<ILoan[]> {
    return await loanModel.find({ returned: false }).populate("bookId");
  }
}
