import express from "express";
import dotenv from "dotenv";
const app = express();
dotenv.config();
const PORT = process.env.PORT;
import userRoute from "./routers/user.router";
import articleRoute from "./routers/article.router";

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/articles", articleRoute);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
