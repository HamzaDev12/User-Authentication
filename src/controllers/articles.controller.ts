import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const createArticle = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({
      message: "somthing wrong",
    });
  }
};
