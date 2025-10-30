import mongoose from "mongoose";

const LevelTraitSchema = new mongoose.Schema({
  level: { type: Number, required: true, min: 1 },
  trait: { type: String, required: true },
});

const SpeciesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    levelTraits: { type: [LevelTraitSchema], default: [] },
    proficiencies: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Species", SpeciesSchema);
