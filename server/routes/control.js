const express = require('express');
const router = express.Router();
const Control = require('../models/Control')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const secret = 'asdfe45we45w345wegw345werjktjwertkj';
const auth = require('../middleware/auth')
const{check,validationResult} = require('express-validator')
const User = require('../models/User');
const isAdmin  = require('../middleware/isAdmin');

//signUp Controller
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
        let user = await Control.findOne({name})
        if(user){
            res.status(400).json({errors:[{msg:'Control already Exists'}]})
        }

        user  = new Control({
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
        const user  = await Control.findById(req.user.id).select('-password')
        res.json(user);

    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error')

    }

}
)

//login user
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
  
    const {name,password} = req.body;
    const userDoc = await Control.findOne({name});
    const passOk = bcrypt.compare(password, userDoc.password);
    if(!passOk){
      res.status(400).json({errors:[{msg:'Invalid credentials'}]})
  }
 
  const payload ={
      user:{
          id:Control.id
      }
  }
  jwt.sign(payload,"secretkey",{expiresIn:360000}
  ,(err,token)=>{
      if(err) throw err;
      res.json({token});
  })
})


router.put('/create/:id',async(req,res)=>{
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
       

    const post = await user.save();
    res.json(post);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('server error')
    }
})


// router.put('/create/:id',[[check('address','Please includer address')
// .not()
// .isEmpty(),
// check('NbLandmark','Please enter near by landmard')
// .not()
// .isEmpty(),
// check('aCasulties','Please enter any casualties or not')
// .isNumeric()
// .notEmpty(),
// check('aPinvolved','Please tell is there anyone involved')
// .not()
// .isEmpty(),
// check('tEmg','Please tell the type of emergency')
// .not()
// .isEmpty()]],async(req,res)=>{
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors:errors.array()})
//     }

//     try {
//         const user = await User.findByIdAndUpdate({_id:req.params.id},{
//             $set:{
//                 address : req.body.address,
//         NbLandmark:req.body.NbLandmark,
//         tEmg:req.body.tEmg,
//         aCasulties:req.body.aCasulties,
//         aPinvolved:req.body.aPinvolved
//             }

//         }).select("-password")
       

//     const post = await user.save();
//     res.json(post);
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('server error')
//     }
// })


router.post('/newForm',auth,isAdmin, [
    check('name', 'Name is required').not().isEmpty(),
    check('mobile', 'Mobile is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { name, mobile, password, address, NbLandmark, tEmg, aCasulties, aPinvolved } = req.body;
  
    try {
      let user = await User.findOne({ mobile });
  
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }
  
      user = new User({
        name,
        mobile,
        password,
        address,
        NbLandmark,
        tEmg,
        aCasulties,
        aPinvolved
      });
  
      await user.save();
  
      res.json(user);
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
module.exports = router