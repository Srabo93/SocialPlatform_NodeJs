import { RequestHandler } from "express";
import Story from "../models/Story";
import { IUser } from "../models/User";

/**
 * @desc Show Add page
 * @route GET /stories/add
 */
export const add: RequestHandler = async (req, res, next) => {
  res.render("../views/stories/add.hbs");
};

/**
 * @desc Show Stories page
 * @route GET /stories
 */
export const stories: RequestHandler = async (req, res, next) => {
  try {
    const stories = await Story.find({ status: "public" })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();

    res.render("stories/index", { stories });
  } catch (error) {
    console.log(error);
    res.render("error/500");
  }
};

/**
 * @desc Show single Story
 * @route GET /stories/:id
 */
export const story: RequestHandler = async (req, res, next) => {
  try {
    let story = await Story.findById({ _id: req.params.id })
      .populate("user")
      .lean();
    if (!story) return res.render("error/404");
    res.render("stories/show", { story });
  } catch (error) {
    console.log(error);
    res.render("error/500");
  }
};

/**
 * @desc Process added Story
 * @route POST /stories/
 */
export const addStory: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user as IUser;
    req.body.user = user.id;

    await Story.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.render("../views/errors/500");
  }
};
/**
 * @desc Edit a Story
 * @route GET /stories/edit/:id
 */
export const editStory: RequestHandler = async (req, res, next) => {
  try {
    const story = await Story.findOne({ _id: req.params.id }).lean();

    if (!story) return res.render("error/404");

    const user = req.user as IUser;

    story.user != user.id
      ? res.redirect("/stories")
      : res.render("stories/edit", { story });
  } catch (error) {
    console.log(error);
    res.redirect("error/500");
  }
};

/**
 * @desc Update a Story
 * @route PUT /stories/:id
 */
export const updateStory: RequestHandler = async (req, res, next) => {
  try {
    let story = await Story.findById(req.params.id).lean();

    if (!story) return res.render("error/404");

    const user = req.user as IUser;

    story.user != user.id
      ? res.redirect("/stories")
      : (story = await Story.findOneAndUpdate(
          { _id: req.params.id },
          req.body,
          {
            new: true,
            runValidators: true,
          }
        ));

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.redirect("error/500");
  }
};

/**
 * @desc Delete Story
 * @route DELETE /stories/:id
 */
export const deleteStory: RequestHandler = async (req, res, next) => {
  try {
    await Story.remove({ _id: req.params.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.redirect("error/500");
  }
};

/**
 * @desc User Stories
 * @route GET /stories/user/:userId
 */
export const userStories: RequestHandler = async (req, res, next) => {
  try {
    let stories = await Story.find({
      user: req.params.userId,
      status: "public",
    })
      .populate("user")
      .lean();
    res.render("stories/index", { stories });
  } catch (error) {
    console.log(error);
    res.redirect("error/500");
  }
};
