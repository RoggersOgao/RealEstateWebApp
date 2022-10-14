const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema(
    {
        username: {
            type:String,
            required:true
        },
        userId: {
            type:String,
            required:true
        },
        img: {
            type:String,
            required:true
        },
        title: {
            type:String,
            required:true
        },
        post: {
            type:String,
            required:true
        },
        categories: {
            type:Array,
            required: true
        }
    },
    {timestamps:true}
)

module.exports =mongoose.model("Post", PostSchema)