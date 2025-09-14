import express, { Request, Response } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import { typeDefs } from "./graphql/typeDefs/index";
import { resolvers } from "./graphql/resolvers/index";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import { authMiddleware } from "./middleware/auth";
import catRoutes from "./routes/catRoutes";
import cookieParser from "cookie-parser";

configDotenv();

interface IContext {
  userId?: string;
  req: Request;
  res: Response;
}

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  }),
);

app.use(bodyParser.json());
app.use(authMiddleware);

app.use("/api/cats", catRoutes);

const startServer = async () => {
  const server = new ApolloServer<IContext>({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }): Promise<IContext> => ({
        userId: (req as any).userId,
        req,
        res,
      }),
    }),
  );

  await mongoose.connect(process.env.MONGO_URI!);
  console.log("MongoDB connected");
};

startServer();

export default app;
