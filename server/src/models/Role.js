import mongoose from "mongoose";

const { Schema } = mongoose;

const RoleSchema = new Schema({
  name: String,
});

const Role = mongoose.model("Role", RoleSchema);

export default Role;
