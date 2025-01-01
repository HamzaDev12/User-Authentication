import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.middleware";
import {
  articleSchema,
  updateArticleSchema,
} from "../../schemas/article.schemas";
import { validationMiddleware } from "../../middleware/validationMiddleware";
import {
  createArticle,
  deleteArticles,
  getallArticles,
  getArticles,
  updateArticle,
} from "../controllers/articles.controller";
const route = Router();

route.post(
  "/new",
  authenticate,
  articleSchema,
  validationMiddleware,
  createArticle
);
route.get("/myArticles", authenticate, getArticles);
route.get("/list", getallArticles);
route.delete("/delete/:articleId", authenticate, deleteArticles);
route.put(
  "/update",
  authenticate,
  updateArticleSchema,
  validationMiddleware,
  updateArticle
);

export default route;
