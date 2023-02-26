import { Router } from "express";
import { dashboard, index } from "../controller";
import { ensureAuth, ensureGuest } from "../middleware/auth";

const router = Router();

router.get("/", ensureGuest, index);
router.get("/dashboard", ensureAuth, dashboard);

export default router;
