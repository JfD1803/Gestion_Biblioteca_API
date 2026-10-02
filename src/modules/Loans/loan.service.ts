import { LoanRepository } from "./loan.repository";
import { ILoan } from "./loan.model";
import { bookModel } from "../Books/book.model";

export class LoanService {
  private repository: LoanRepository;

  constructor() {
    this.repository = new LoanRepository();
  }

  // Registrar un préstamo
  async createLoan(data: Partial<ILoan>): Promise<ILoan> {
    if (!data.bookId) {
      throw new Error("El ID del libro (bookId) es obligatorio.");
    }

    if (!data.userName || data.userName.trim() === "") {
      throw new Error("El nombre del usuario (userName) es obligatorio.");
    }

    if (!data.loanDate) {
      data.loanDate = new Date();
    }

    // Verificar que el libro exista en la base de datos
    const bookExists = await bookModel.findById(data.bookId);
    if (!bookExists) {
      throw new Error("El libro especificado no existe en la base de datos.");
    }

    // Verificar disponibilidad del libro
    if (bookExists.available === false) {
      throw new Error("El libro seleccionado no se encuentra disponible para préstamo.");
    }

    // Registrar el préstamo y marcar el libro como no disponible
    const newLoan = await this.repository.create(data);
    await bookModel.findByIdAndUpdate(data.bookId, { available: false });

    return newLoan;
  }

  // Registrar devolución de un libro
  async returnLoan(id: string): Promise<ILoan> {
    const existingLoan = await this.repository.findById(id);
    if (!existingLoan) {
      throw new Error(`El préstamo con ID '${id}' no existe.`);
    }

    if (existingLoan.returned) {
      throw new Error("Este préstamo ya fue devuelto previamente.");
    }

    // Actualizar préstamo a devuelto
    const updatedLoan = await this.repository.update(id, {
      returned: true,
      returnDate: new Date()
    });

    // Marcar el libro como disponible nuevamente
    await bookModel.findByIdAndUpdate(existingLoan.bookId, { available: true });

    return updatedLoan!;
  }

  // Obtener todos los préstamos
  async getAllLoans(): Promise<ILoan[]> {
    return await this.repository.findAll();
  }

  // Obtener préstamo por ID
  async getLoanById(id: string): Promise<ILoan> {
    const foundLoan = await this.repository.findById(id);
    if (!foundLoan) {
      throw new Error(`Préstamo con ID '${id}' no encontrado.`);
    }
    return foundLoan;
  }

  // Eliminar préstamo
  async deleteLoan(id: string): Promise<ILoan> {
    const foundLoan = await this.repository.findById(id);
    if (!foundLoan) {
      throw new Error(`Préstamo con ID '${id}' no encontrado.`);
    }
    const deletedLoan = await this.repository.delete(id);
    return deletedLoan!;
  }
}
