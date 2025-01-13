import cors from "cors";
import { config } from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";

config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.AUTH_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5555/api/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  "/api/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get(
  "/api/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/api/auth/error" }),
  (req, res) => {
    res.redirect("http://localhost:5173/");
  }
);

app.get("/api/auth/error", (req, res) => {
  res.status(401).send("Error on Auth.");
});

app.get("/api/auth/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).send("User not authenticated.");
  }
});

app.get("/api/auth/logout", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send("User not authenticated.");
  }
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Error on Logout.");
    }
    res.redirect("http://localhost:5173");
  });
});

app.listen(5555, () => {
  console.log("Auth server is running on: http://localhost:5555");
});
