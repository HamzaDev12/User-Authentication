import { Router } from "express";
import {
  loginUser,
  registorUser,
  whoami,
} from "../controllers/user.controller";
import { loginUserSchema, registrationUser } from "../../schemas/user.schema";
import { validationMiddleware } from "../../middleware/validationMiddleware";
import { authenticate } from "../../middleware/authenticate.middleware";
const route = Router();

route.post("/new", registrationUser, validationMiddleware, registorUser);
route.post("/login", loginUserSchema, validationMiddleware, loginUser);
route.get("/whoami", authenticate, whoami);

export default route;
