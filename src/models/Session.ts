import mongoose, { Schema } from "mongoose";

interface ISession {
  sessionId: string;
  userId: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new Schema<ISession>(
  {
    sessionId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    refreshToken: { type: String, required: true },
  },
  { timestamps: true }
);

export const Session = mongoose.model<ISession>("Session", SessionSchema);
