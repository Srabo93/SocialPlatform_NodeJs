import { RequestHandler } from "express";
import passport from "passport";

/**
 * @desc Google auth callback
 * @route GET /auth/google/callback
 */
export const googleAuthCallback: RequestHandler = async (req, res, next) => {
  res.redirect("/dashboard");
};

/**
 * @desc Logout user
 * @route /auth/logout
 */
export const logout: RequestHandler = async (req, res, next) => {
  req.logout((done) => console.log(done));
  res.redirect("/");
};
