import { AppDataSource } from "./db";
import { Env } from "./env";
import { dbCreate } from "./db";
import cors from "cors";
import { todoRouter } from "./routes";
import express from "express";
let isDbInitialized = false;

const setupServer = async () => {
  if (!isDbInitialized) {
    try {
      await dbCreate();
      await AppDataSource.initialize();
      isDbInitialized = true;
    } catch (error) {
      console.error("Error initializing database", error);
      process.exit(1);
    }
  }
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use("/api/todos", todoRouter);
  const port = Env.port ?? "3000";

  app.get("/", (_req, res) => {
    res.send("OK");
  });

  app.listen(port, () => {
    console.log(`Todo List Backend listening on port ${port}`);
  });
};

setupServer();
