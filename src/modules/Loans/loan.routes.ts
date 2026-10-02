import { Router } from "express";
import { LoanController } from "./loan.controller";

const loanRouter = Router();
const loanController = new LoanController();

// ➕ Registrar préstamo
loanRouter.post("/", loanController.createLoan);

// 📋 Obtener todos los préstamos
loanRouter.get("/", loanController.getAllLoans);

// 📖 Obtener préstamo por ID
loanRouter.get("/:id", loanController.getLoanById);

// 🔄 Devolver libro (Actualiza status a devuelto)
loanRouter.put("/:id/return", loanController.returnLoan);

// 🗑️ Eliminar préstamo por ID
loanRouter.delete("/:id", loanController.deleteLoan);

export default loanRouter;
