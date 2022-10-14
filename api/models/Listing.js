const mongoose = require("mongoose")

const ListingSchema = new mongoose.Schema({

username:{
    type:String,
    required:true,
},
userId:{
    type:String,
    required:true,
},
propertyState:{
    type:String,
    required:true,
},
propertyType:{
    type:String,
    required:true,
},
propertyName:{
    type:String,
    required:true,
},
location:{
    type:String,
    required:true,
},
bedrooms:{
    type:Number,
    required:false,
},
bathrooms:{
    type:Number,
    required:false,
},
price:{
    type:Number,
    required:true
},
propertySize:{
    type:Number,
    required:false,
},
rating:{
    type:Number,
    required:false,
},
description:{
    type:String,
    required:true,
},
img:{
    type:Array,
    required:true
},
features:{
    type:Array,
    required:false,
}
},{timestamps:true})

module.exports = mongoose.model("Listing", ListingSchema)