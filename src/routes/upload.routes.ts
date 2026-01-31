import { Router } from "express";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

router.post("/", upload.single("file"), (req, res) => {
  res.json({ url: (req.file as any).path });
});

export default router;
