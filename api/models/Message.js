const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: false,
    },
    userId:{
        type:String,
        required:true,
        unique:false
    },
    propertyId:{
        type:String,
        required:true,
        unique:false,
    },
    phoneNumber:{
      type:String,
      required:true,
      unique:false
    },
    otherNumber:{
      type:String,
      required:false,
      unique:false
    },
    profile: {
      type:String,
      required:false,
      default:"",
      unique:false,
    },
    message:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);