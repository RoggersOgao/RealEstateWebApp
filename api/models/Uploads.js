const mongoose = require("mongoose")

const UploadsSchema = new mongoose.Schema({    
        imgCollection:{
            type:Array,
            required:true,
        },
},
{timestamps:true}
)

module.export = mongoose.model("Uploads", UploadsSchema)