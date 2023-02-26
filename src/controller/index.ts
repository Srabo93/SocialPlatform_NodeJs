import { RequestHandler } from "express";

/**
 * @desc Login/Landing page
 * @route GET /
 */
export const index: RequestHandler = async (req, res, next) => {
  res.render("login");
};

/**
 * @desc Dashboard
 * @route GET /dashboard
 */

export const dashboard: RequestHandler = async (req, res, next) => {
  try {
    // const stories = await Story.find({ user: req.user.id }).lean();

    res.render("dashboard", {
      // name: req.user.displayName,
      // stories,
    });
  } catch (error) {
    console.log(error);
    res.render("../views/errors/500.hbs");
  }
};
