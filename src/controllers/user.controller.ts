import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { ILoginUser, IRegistorUser } from "../../types/user.interface";
const prisma = new PrismaClient();
import { secretKey } from "../secret";
import { generateToken } from "../../helpers/jwt.helpers";
import argon2 from "argon2";
import { authRequest } from "../../types/request";

export const registorUser = async (req: Request, res: Response) => {
  try {
    const data: IRegistorUser = req.body;

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

    const hashPassword = await argon2.hash(data.password);

    const createUser = await prisma.users.create({
      data: {
        fullname: data.fullname,
        email: data.email,
        password: hashPassword,
        phoneNumber: data.phoneNumber,
      },
    });

    const { password, ...rest } = createUser;

    res.status(201).json({
      message: "seccesfully created",
      createUser: rest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something wrong on the server",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const data: ILoginUser = req.body;
    const user = await prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      res.status(401).json({
        message: "incorrect password or email",
      });
      return;
    }

    const isHashPassword = await argon2.verify(user.password, data.password);
    if (!isHashPassword) {
      res.status(401).json({
        message: "incorrect password or email",
      });
      return;
    }
    const { password, ...rest } = user;
    const accessToken = generateToken(user.id);
    res.status(200).json({
      message: "seccessfully Login",
      user: rest,
      token: accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something wrong on the server",
    });
  }
};

export const whoami = async (req: authRequest, res: Response) => {
  try {
    const userId = req.userId;
    const users = await prisma.users.findFirst({
      where: {
        id: userId,
      },
    });
    if (!users) {
      res.status(302).json({
        message: "user not found",
      });
      return;
    }

    const { password, ...rest } = users;
    const accessToken = generateToken(users.id);
    res.status(200).json({
      message: "successfully",
      user: rest,
      token: accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something wrong on the server",
    });
  }
};
