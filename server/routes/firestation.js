const express = require('express');
const router = express.Router();
const FS = require('../models/FireStation')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const{check,validationResult} = require('express-validator')
const User = require('../models/User');
router.post('/signup',[check('name','Name is required')
.not()
.isEmpty(),

check(
    'password',
    'Please enter a password with 6 or more characters'
).isLength({min:6})],async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array})
    }
    const {name,password} = req.body;

    try {
        let user = await FS.findOne({name})
        if(user){
            res.status(400).json({errors:[{msg:'FS already Exists'}]})
        }

        user  = new FS({
            name,password
        })
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        await user.save();

        const payload ={
            user:{
                id:user.id
            }
        }
        jwt.sign(payload,"secretkey",{expiresIn:360000}
        ,(err,token)=>{
            if(err) throw err;
            res.json({token});
        })
    } catch (error) {
        console.log(err)
    }
})


router.get('/',auth,async (req,res)=>{
    try{
        const user  = await FS.findById(req.user.id).select('-password')
        res.json(user);

    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error')

    }

}
)

router.post('/login',[check('name','Please include a valid name')
.notEmpty(),
check(
    'password',
    'password is requried'
).exists()],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {mobile,password} = req.body;
   try{
    let user = await FS.findOne({mobile});
    if(!user){
        res.status(400).json({errors:[{msg:'Invalid credentials'}]})
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        res.status(400).json({errors:[{msg:'Invalid credentials'}]})
    }
   
    const payload ={
        user:{
            id:user.id
        }
    }
    jwt.sign(payload,"secretkey",{expiresIn:360000}
    ,(err,token)=>{
        if(err) throw err;
        res.json({token});
    })

   }catch(err){
    console.log(err)

   }

  
})

router.put('/create/:id',[auth,[check('address','Please includer address')
.not()
.isEmpty(),
check('NbLandmark','Please enter near by landmard')
.not()
.isEmpty(),
check('aCasulties','Please enter any casualties or not')
.isNumeric()
.notEmpty(),
check('aPinvolved','Please tell is there anyone involved')
.not()
.isEmpty(),
check('tEmg','Please tell the type of emergency')
.not()
.isEmpty()]],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try {
        const user = await User.findByIdAndUpdate({_id:req.params.id},{
            $set:{
                address : req.body.address,
        NbLandmark:req.body.NbLandmark,
        tEmg:req.body.tEmg,
        aCasulties:req.body.aCasulties,
        aPinvolved:req.body.aPinvolved
            }

        }).select("-password")
       
    // const newPost= new User({
    //     address : req.body.address,
    //     NbLandmark:req.body.NbLandmark,
    //     tEmg:req.body.tEmg,
    //     aCasulties:req.body.aCasulties,
    //     aPinvolved:req.body.aPinvolved
    // }   )
    const post = await user.save();
    res.json(post);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('server error')
    }
})


module.exports = router