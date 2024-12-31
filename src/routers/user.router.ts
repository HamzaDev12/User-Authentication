import { Router } from "express";
import { loginUser, registorUser } from "../controllers/user.controller";
import { loginUserSchema, registrationUser } from "../../schemas/user.schema";
import { validationMiddleware } from "../../middleware/validationMiddleware";
const route = Router();

route.post("/new", registrationUser, validationMiddleware, registorUser);
route.post("/login", loginUserSchema, validationMiddleware, loginUser);

export default route;
