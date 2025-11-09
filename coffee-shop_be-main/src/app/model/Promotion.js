import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema(
  {
    author: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        default: "https://ui-avatars.com/api/?name=Admin&background=random",
      },
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    media: [
      {
        type: {
          type: String,
          enum: ["image", "video"],
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        thumbnail: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Promotion", promotionSchema);
