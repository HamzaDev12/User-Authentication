import { body } from "express-validator";

export const registrationUser = [
  body("fullname")
    .isString()
    .isLength({ min: 17, max: 54 })
    .withMessage("Enter only name"),
  body("phoneNumber")
    .isLength({ min: 6, max: 14 })
    .withMessage("envalid phone number required"),
  body("email").isEmail().withMessage("invalid format"),
  body("password")
    .isLength({ min: 8, max: 64 })
    .withMessage("your password too short"),
  body("confirm")
    .isLength({ min: 8, max: 64 })
    .withMessage("both passwords must be the same"),
];

export const loginUserSchema = [
  body("email").isEmail().withMessage("invalid format message"),
  body("password").isLength({ min: 8, max: 64 }),
];
