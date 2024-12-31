import jwt from "jsonwebtoken";
import { secretKey } from "../src/secret";
export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, secretKey, {
    expiresIn: "2d",
  });
};
