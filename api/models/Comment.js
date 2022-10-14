const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema(
    {
    postId:{
        type:String,
        required:true,
        unique:true
        },
    username:{
        type:String,
        required:true,
        unique:false
    },
    img:{
        type:String,
        required:false
    },
    comment:{
        type:String,
        required:true
    }
    },
    {timestamps:true}
)

module.exports= mongoose.model("Comment", CommentSchema)