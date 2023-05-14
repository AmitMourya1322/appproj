const mongoose = require('mongoose');
const fireStationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
  
    password:{
        type:String,
        required:true
    },
    report:{
        type:String,
    }
    
},{
    timestamps:true
})

module.exports = fireStation = mongoose.model("fireStation",fireStationSchema)