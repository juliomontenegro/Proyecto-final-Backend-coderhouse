import mongoose from "mongoose";

 const collection="usuarios";

const userSchema = new mongoose.Schema({
  _id:String,
  name:{type:String, required:true},
  email:{type:String, required:true},
  password:{type:String, required:true},
  age:{type:Number, required:true},
  phone:{type:String, required:true},
  address:{type:String, required:true},
  avatar:{type:String, required:true},
});

const UserModel = mongoose.model(collection, userSchema);

export default UserModel;