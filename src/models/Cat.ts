import mongoose, { Schema } from "mongoose";
import { ICat } from "../shared/types/cat.types";

interface ICatDocument extends ICat, mongoose.Document {}

const CatSchema = new Schema<ICatDocument>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  length: { type: String, required: true },
  years: { type: String, required: true },
  weight: { type: String, required: true },
  cost: { type: String, required: true },
  rate: { type: String, required: true },
  description: { type: String, required: true },
  character: { type: String, required: true },
  diet: { type: String, required: true },
  health: { type: String, required: true },
  care: { type: String, required: true },
  url: { type: String, required: true },
});

export const Cat = mongoose.model<ICatDocument>("Cat", CatSchema);
