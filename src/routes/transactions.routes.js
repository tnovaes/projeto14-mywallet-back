import { Router } from "express";
import { authValidation } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { transactionSchema } from "../schemas/transactions.schemas.js";
import { transaction } from "../controllers/transactions.controllers.js";

const transactionsRouter = Router();

transactionsRouter.use(authValidation);

transactionsRouter.post('/transactions', validateSchema(transactionSchema), transaction);


export default transactionsRouter;