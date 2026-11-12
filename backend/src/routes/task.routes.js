import { Router } from "express";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

// Example protected endpoint proving that JWT middleware protects data routes.
router.get("/", requireAuth, (req, res) => {
  res.json({
    message: "You accessed protected task data.",
    uid: req.auth.uid,
    tasks: [{ id: 1, title: "Sprint 14 authentication", status: "In progress" }]
  });
});

export default router;
