import mongoose from "mongoose";

const shortenerSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    s_url: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Shortener = mongoose.model("Shortener", shortenerSchema);

export default Shortener;
