import { Router } from "express";
import authorRoutes from "../../modules/Authors/author.routes";
import bookRoutes from "../../modules/Books/book.routes";
import loansRoutes from "../../modules/Loans/loan.routes";

const router = Router();

router.use('/author', authorRoutes);
router.use('/book', bookRoutes);
router.use('/loan', loansRoutes);

export default router;
