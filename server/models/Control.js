const mongoose = require('mongoose');
const controlSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
  
    password:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:1,
    }
    
},{
    timestamps:true
})

module.exports = control = mongoose.model("control",controlSchema)