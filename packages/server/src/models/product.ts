import { IProduct } from "../interfaces/IProduct";
import mongoose from "mongoose";

const Product = new mongoose.Schema(
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

export default mongoose.model<IProduct & mongoose.Document>(
  "products",
  Product
);
