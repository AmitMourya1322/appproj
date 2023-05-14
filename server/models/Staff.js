const mongoose = require('mongoose');
const staffSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
  
    password:{
        type:String,
        required:true
    }
    
},{
    timestamps:true
})

module.exports = staff = mongoose.model("staff",staffSchema)