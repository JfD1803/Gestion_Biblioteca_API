import { Request, Response } from "express";
import { LoanService } from "./loan.service";

export class LoanController {
  private service: LoanService;

  constructor() {
    this.service = new LoanService();
  }

  // POST /api/v1/loans -> Registrar un nuevo préstamo
  createLoan = async (req: Request, res: Response): Promise<void> => {
    try {
      const newLoan = await this.service.createLoan(req.body);
      res.status(201).json({
        success: true,
        data: newLoan
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Error al registrar el préstamo"
      });
    }
  };

  // PUT /api/v1/loans/:id/return -> Marcar libro como devuelto
  returnLoan = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const returnedLoan = await this.service.returnLoan(id);
      res.status(200).json({
        success: true,
        message: "Libro devuelto exitosamente",
        data: returnedLoan
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Error al procesar la devolución"
      });
    }
  };

  // GET /api/v1/loans -> Obtener todos los préstamos
  getAllLoans = async (_req: Request, res: Response): Promise<void> => {
    try {
      const loans = await this.service.getAllLoans();
      res.status(200).json({
        success: true,
        count: loans.length,
        data: loans
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "Error al obtener préstamos"
      });
    }
  };

  // GET /api/v1/loans/:id -> Obtener préstamo por ID
  getLoanById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const loan = await this.service.getLoanById(id);
      res.status(200).json({
        success: true,
        data: loan
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || "Préstamo no encontrado"
      });
    }
  };

  // DELETE /api/v1/loans/:id -> Eliminar registro de préstamo
  deleteLoan = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deletedLoan = await this.service.deleteLoan(id);
      res.status(200).json({
        success: true,
        message: "Registro de préstamo eliminado",
        data: deletedLoan
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || "Error al eliminar préstamo"
      });
    }
  };
}
