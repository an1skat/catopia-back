import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers/index";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import { authMiddleware } from "./middleware/auth";
import catRoutes from "./routes/catRoutes";

configDotenv();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(authMiddleware);

app.use("/api/cats", catRoutes);

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        userId: (req as any).userId,
        req,
        res,
      }),
    })
  );

  mongoose.connect(process.env.MONGO_URI!).then(() => {
    console.log("MongoDB connected");
  });
};

startServer();

export default app;
