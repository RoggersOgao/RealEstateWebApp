const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    nationalID: {
      type:String,
      required:true,
      unique:true
    },
    phoneNumber:{
      type:String,
      required:true,
      unique:true
    },
    otherNumber:{
      type:String,
      required:false,
      unique:true
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type:String,
      required:false,
      default:"",
      unique:true,
    },
    isAdmin:{
      type:Boolean,
      required:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);