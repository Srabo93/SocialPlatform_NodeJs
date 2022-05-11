const express = require("express");
const { redirect } = require("express/lib/response");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Story = require("../models/Story");
/**
 * @desc Show Add page
 * @route GET /stories/add
 */
router.get("/add", ensureAuth, (req, res) => {
  res.render("../views/stories/add.hbs");
});

/**
 * @desc Show Stories page
 * @route GET /stories
 */
router.get("/", ensureAuth, async (req, res) => {
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
});

/**
 * @desc Process added Story
 * @route POST /stories/
 */
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.render("../views/errors/500");
  }
});
module.exports = router;

/**
 * @desc Edit a Story
 * @route GET /stories/edit/:id
 */
router.get("/edit/:id", ensureAuth, async (req, res) => {
  const story = await Story.findOne({ _id: req.params.id }).lean();

  if (!story) return res.render("error/404");

  story.user != req.user.id
    ? res.redirect("/stories")
    : res.render("stories/edit", { story });
});
