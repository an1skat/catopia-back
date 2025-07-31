import express from "express";
import { catController } from "../controllers/catController";

const router = express.Router();

router.get("/", catController.getAllCats);
router.get("/:id", catController.getCatById);

export default router;
