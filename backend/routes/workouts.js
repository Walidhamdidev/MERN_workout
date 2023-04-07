import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Getting..." });
});
router.get("/:id", (req, res) => {
  res.json({ msg: "Getting single..." + req.params.id });
});

router.post("/", (req, res) => {
  res.json({ msg: "Posting..." });
});
router.delete("/", (req, res) => {
  res.json({ msg: "Deleting..." });
});

export default router;
