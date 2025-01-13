import { Auth } from "@auth/core";
import GitHub from "@auth/core/providers/github";
import { config } from "dotenv";
import express from "express";

const app = express();

import cors from "cors";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", async (req, res, next) => {
  const auth = Auth({
    providers: [
      GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
    ],
    secret: process.env.AUTH_SECRET,
  });

  const handler = await auth(req, res);
  if (handler) {
    return handler;
  }

  next();
});

config();

app.listen(5555, () => {
  console.log("Auth server is running on: http://localhost:5555");
});
