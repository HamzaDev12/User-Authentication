export interface ICreateArticle {
  title: string;
  content: string;
  isPublished: boolean;
}

export interface IUpdatedArticle {
  articleId: number;
  title: string;
  content: string;
  isPublished: boolean;
}
