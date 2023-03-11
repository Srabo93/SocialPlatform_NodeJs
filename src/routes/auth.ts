import { Router } from "express";
import passport from "passport";
import { googleAuthCallback, logout } from "../controller/auth";
const router = Router();

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  googleAuthCallback
);

router.get("/logout", logout);

export default router;
