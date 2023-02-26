import { Router } from "express";
import {
  add,
  // addStory,
  deleteStory,
  // editStory,
  stories,
  story,
  // updateStory,
  userStories,
} from "../controller/stories";
import { ensureAuth } from "../middleware/auth";
const router = Router();

router.get("/add", ensureAuth, add);
// router.get("/", ensureAuth, stories);
router.get("/", stories);
router.get("/:id", ensureAuth, story);
// router.post("/", ensureAuth, addStory);
// router.get("/edit/:id", ensureAuth, editStory);
// router.put("/:id", ensureAuth, updateStory);
router.delete("/:id", ensureAuth, deleteStory);
router.get("/user/:userId", ensureAuth, userStories);
export default router;
