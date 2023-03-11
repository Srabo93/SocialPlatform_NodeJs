import mongoose from "mongoose";

export interface IUser {
  id: mongoose.Types.ObjectId;
  googleId: string;
  displayName: string;
  image: string;
  createdAt?: string;
}
const UserSchema = new mongoose.Schema<IUser>({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("User", UserSchema);
export default User;
