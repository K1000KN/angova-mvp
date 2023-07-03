import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  refreshToken: String,
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  manager: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
