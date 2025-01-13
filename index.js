import { Auth } from "@auth/core";
import GitHub from "@auth/core/providers/github";
import express from "express";

const app = express();

app.use(
  "/api/auth",
  Auth({
    providers: [
      GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
    ],
    secret: process.env.AUTH_SECRET,
  })
);

app.listen(5555, () => {
  console.log("Auth server is running on: 5555");
});
