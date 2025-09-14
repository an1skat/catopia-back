"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catController_1 = require("../controllers/catController");
const router = express_1.default.Router();
router.get("/", catController_1.catController.getAllCats);
router.get("/:id", catController_1.catController.getCatById);
exports.default = router;
