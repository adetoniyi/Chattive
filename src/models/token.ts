import mongoose, { Document, Schema } from "mongoose";

export interface IToken extends Document {
  user: mongoose.Types.ObjectId;
  token: string;
  type: "resetPassword" | "verifyEmail";
  expiresAt: Date;
}

const tokenSchema = new Schema<IToken>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["resetPassword", "verifyEmail"],
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Optional: Auto-delete expired tokens
tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<IToken>("Token", tokenSchema);
