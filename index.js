import SQLiteStore from "connect-sqlite3";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { initializeDatabase } from "./db.js";

config();

const app = express();

(async () => {
  await initializeDatabase();
  console.log("Database initialized");
})();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

const SQLiteSessionStore = SQLiteStore(session);
app.use(
  session({
    store: new SQLiteSessionStore({
      db: "sessions.db",
      dir: "./data",
    }),
    secret: process.env.AUTH_SECRET || "default-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 dia
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.API_BASE_URL}/api/auth/github/callback`,
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
    res.redirect(process.env.FRONTEND_URL);
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

app.get("/api/auth/logout", (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send("User not authenticated.");
  }
  req.logout((err) => {
    if (err) {
      console.error("Error during logout:", err);
      return res.status(500).send("Error on Logout.");
    }
    res.redirect(process.env.FRONTEND_URL);
  });
});

app.listen(5555, () => {
  console.log("Auth server is running on: http://localhost:5555");
});
