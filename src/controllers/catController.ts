import { Request, Response } from "express";
import { Cat } from "../models/Cat";

export const catController = {
  // GET /api/cats
  getAllCats: async (req: Request, res: Response) => {
    try {
      const cats = await Cat.find();
      res.json(cats);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // GET /api/cats/:id
  getCatById: async (req: Request, res: Response) => {
    try {
      const cat = await Cat.findById(req.params.id);
      if (!cat) return res.status(404).json({ error: "Cat not found" });
      res.json(cat);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
