import { Router } from "express";
import authorRoutes from "../../modules/Authors/author.routes";
import bookRoutes from "../../modules/Books/book.routes";
import loansRoutes from "../../modules/Loans/loan.routes";
import genreRoutes from "../../modules/Genres/genre.routes";

const router = Router();

router.use('/author', authorRoutes);
router.use('/book', bookRoutes);
router.use('/loan', loansRoutes);
router.use('/genre', genreRoutes);

export default router;
