import mongoose from "mongoose";

const LevelTraitSchema = new mongoose.Schema({
  level: { type: Number, required: true, min: 1 },
  trait: { type: String, required: true },
});

const ClassSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    levelTraits: { type: [LevelTraitSchema], default: [] },
    proficiencies: { type: [String], default: [] }, // competencias
  },
  { timestamps: true }
);

export default mongoose.model("Class", ClassSchema);
