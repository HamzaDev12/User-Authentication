import { body } from "express-validator";

export const articleSchema = [
  body("title")
    .isString()
    .isLength({ min: 6, max: 64 })
    .withMessage("your title must be the min 6 char and max 64 char"),
  body("content").isString().isLength({ min: 10 }).withMessage("is too short"),
  body("isPublished").isBoolean().withMessage("is published must be boolean"),
];

export const updateArticleSchema = [
  body("title")
    .isString()
    .isLength({ min: 6, max: 64 })
    .withMessage("your title must be the min 6 char and max 64 char"),
  body("content").isString().isLength({ min: 10 }).withMessage("is too short"),
  body("isPublished").isBoolean().withMessage("is published must be boolean"),
  body("articleId").isNumeric().withMessage("the id is not found"),
];
