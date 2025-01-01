import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { authRequest } from "../../types/request";
import { ICreateArticle, IUpdatedArticle } from "../../types/article";
const prisma = new PrismaClient();

export const createArticle = async (req: authRequest, res: Response) => {
  try {
    const data: ICreateArticle = req.body;
    const article = await prisma.articles.create({
      data: {
        title: data.title,
        content: data.content,
        isPublished: data.isPublished,
        userId: req.userId!,
      },
    });
    res.status(201).json({
      message: "successfullly created",
      newArticle: article,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "somthing wrong",
    });
  }
};

export const getArticles = async (req: authRequest, res: Response) => {
  try {
    const userId = req.userId;
    const articles = await prisma.articles.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            email: true,
          },
        },
      },
    });

    if (!articles || articles.length === 0) {
      res.status(404).json({
        message: "this user not have an articles",
      });
      return;
    }
    res.status(302).json({
      message: "you get all articles",
      articles: articles,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "somthing wrong",
    });
  }
};

export const getallArticles = async (req: Request, res: Response) => {
  try {
    const articles = await prisma.articles.findMany({
      where: {
        isPublished: true,
      },
    });

    res.status(200).json({
      message: "you get all the articles published",
      articles: articles,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "somthing wrong",
    });
  }
};

export const deleteArticles = async (req: Request, res: Response) => {
  try {
    const { articleId } = req.params;
    const article = await prisma.articles.findFirst({
      where: {
        id: +articleId,
      },
    });
    if (!article) {
      res.status(404).json({
        message: "the article is not exist",
      });
      return;
    }
    const deleyingArticle = await prisma.articles.delete({
      where: {
        id: Number(articleId),
      },
    });
    res.status(200).json({
      message: "deleted record",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "somthing wrong",
    });
  }
};

export const updateArticle = async (req: authRequest, res: Response) => {
  try {
    const data: IUpdatedArticle = req.body;
    const article = await prisma.articles.findFirst({
      where: {
        id: data.articleId,
      },
    });
    if (!article) {
      res.status(404).json({
        message: "the article is not found",
      });
      return;
    }
    const updatedArticle = await prisma.articles.update({
      where: {
        id: data.articleId,
      },
      data: {
        title: data.title,
        content: data.content,
        isPublished: data.isPublished,
      },
    });
    res.status(201).json({
      message: "updated record",
      newUpdate: updatedArticle,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "somthing wrong",
    });
  }
};
