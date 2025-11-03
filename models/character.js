import mongoose from "mongoose";

const CharacterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    level: { type: Number, required: true, min: 1, max: 20 },
    class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    species: { type: mongoose.Schema.Types.ObjectId, ref: "Species", required: true },
    background: { type: String, default: "" },
    portrait: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Character", CharacterSchema);
