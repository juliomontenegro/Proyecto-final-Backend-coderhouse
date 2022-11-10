import mongoose from "mongoose";

 const collection="usuarios";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
  phone: String,
  address: String,
  avatar: String,
});

const UserModel = mongoose.model(collection, userSchema);

export default UserModel;