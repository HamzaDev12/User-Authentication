import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { secretKey } from "../src/secret";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeaders = req?.headers?.authorization;
    if (!authHeaders) {
      res.status(401).json({
        message: "unAuth0rized (No Headers)",
      });
      return;
    }

    const token = authHeaders.split(" ")[1];
    if (!token) {
      res.status(401).json({
        message: "unAuth0rized (No token)",
      });
      return;
    }

    const result = jwt.verify(token, secretKey);
    if (!result) {
      res.status(401).json({
        message: "token expired",
      });
      return;
    }

    res.json(result);
  } catch (error) {
    res.status(401).json({
      message: "unAuth0rized",
    });
  }
};
