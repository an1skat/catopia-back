"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catController = void 0;
const Cat_1 = require("../models/Cat");
exports.catController = {
    // GET /api/cats
    getAllCats: async (req, res) => {
        try {
            const cats = await Cat_1.Cat.find();
            res.json(cats);
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    },
    // GET /api/cats/:id
    getCatById: async (req, res) => {
        try {
            const cat = await Cat_1.Cat.findById(req.params.id);
            if (!cat)
                return res.status(404).json({ error: "Cat not found" });
            res.json(cat);
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    },
};
