import mongoose from "mongoose";
interface IStory {
  title: string;
  body: string;
  status: string;
  user: mongoose.Types.ObjectId;
  createdAt?: string;
}
const StorySchema = new mongoose.Schema<IStory>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "public",
    enum: ["public", "private"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Story = mongoose.model("Story", StorySchema);
export default Story;
