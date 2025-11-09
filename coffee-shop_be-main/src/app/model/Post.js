import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  author: {
    id: String,
    name: String,
    avatar: String
  },
  content: String,
  media: Array,
  likes: {
    count: { type: Number, default: 0 },
    likedBy: [String]
  },
  comments: Array,
  shares: {
    count: { type: Number, default: 0 }
  },
  isEdited: { type: Boolean, default: false },
  editedAt: Date
}, { timestamps: true });

export default mongoose.model("Post", postSchema);
