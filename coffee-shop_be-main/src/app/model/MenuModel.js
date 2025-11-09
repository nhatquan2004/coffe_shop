import mongoose from "mongoose";

const menu = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

const MenuModel = mongoose.model("menus", menu);

export default MenuModel
