const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
        // unique:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        default:null
       
    },
    // near by land mark
    NbLandmark:{
        type:String,
        default:null
    },
    //type of emergency
    tEmg:{
        type:String,
        default:null,
    },
    //any casulaties
    aCasulties:{
        type:Number,
        default:0
    },
    //any person involved
    aPinvolved:{
        type:String,
        default:null
    },
    role:{
        type:Number,
        default:2,
    }
    
},{
    timestamps:true
})

module.exports = user = mongoose.model("user",userSchema)