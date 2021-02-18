import mongoose from "mongoose";

import { IItem } from "interfaces/IItem";

const Item = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a product name"]
    },
    price: {
      type: Number,
      required: [true, "Please enter a product price"],
      min: 0
    },
    count: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { timestamps: true }
);

Item.index({ name: "text" });

export default mongoose.model<IItem & mongoose.Document>("items", Item);
