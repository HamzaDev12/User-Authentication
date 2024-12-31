import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { IRegistorUser } from "../../types/user.interface";
const prisma = new PrismaClient();

export const registorUser = async (req: Request, res: Response) => {
  try {
    const data: IRegistorUser = req.body;
    if (
      !data.confirm ||
      !data.email ||
      !data.fullname ||
      !data.password ||
      !data.phoneNumber
    ) {
      res.status(400).json({
        message: "required columns is missing ",
      });
      return;
    }

    const user = await prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });
    if (user) {
      res.status(409).json({
        message: "user already exists",
      });
      return;
    }

    if (data.password !== data.confirm) {
      res.status(400).json({
        message: "both passwords must be the same",
      });
      return;
    }

    const createUser = await prisma.users.create({
      data: {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "something wrong on the server",
    });
  }
};
