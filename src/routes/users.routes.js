import { Router } from "express";
import { signIn, signUp } from "../controllers/users.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { signUpSchema, signInSchema } from "../schemas/users.schemas.js";

const usersRouter = Router();

usersRouter.post('/signup', validateSchema(signUpSchema), signUp);
usersRouter.post('/signin', validateSchema(signInSchema), signIn);

export default usersRouter;