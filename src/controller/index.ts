import { RequestHandler } from "express";
import Story from "../models/Story";
import { IUser } from "../models/User";

/**
 * @desc Login/Landing page
 * @route GET /
 */
export const index: RequestHandler = async (req, res, next) => {
  res.render("login", { layout: "login" });
};

/**
 * @desc Dashboard
 * @route GET /dashboard
 */

export const dashboard: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user as IUser;
    const stories = await Story.find({ user: user.id }).lean();

    res.render("dashboard", {
      name: user.displayName,
      stories,
    });
  } catch (error) {
    console.log(error);
    res.render("../views/errors/500.hbs");
  }
};
