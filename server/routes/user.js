const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const axios = require('axios')
const auth = require('../middleware/auth')
const{check,validationResult} = require('express-validator');
const isAdmin  = require('../middleware/isAdmin');
const fs = require('fs');
const FormData = require('form-data');

router.post('/signup',[check('name','Name is required')
.not()
.isEmpty(),
check('mobile','Mobile No. is required')
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
    const {name,mobile,password} = req.body;

    try {
        let user = await User.findOne({mobile})
        if(user){
            res.status(400).json({errors:[{msg:'User already Exists'}]})
        }

        user  = new User({
            name,mobile,password
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


router.get('/post', async (req,res) => {
    res.json(
        await User.find({}, 'name mobile tEmg createdAt')
        .sort({createdAt: -1})
        .limit(20)
        .select('-password')
    );
});

router.get('/post/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });



// router.get('/post', async (req,res) => {
//     res.json(
//       await User.find()
//         .populate('name', 'mobile','tEmg')
//         .sort({createdAt: -1})
//         .limit(20)
//     ).select('-password');
//   });

// router.get('/',auth,async (req,res)=>{
//     try{
//         const user  = await User.findById(req.user.id).select('-password')
//         res.json(user);

//     }catch(err){
//         console.log(err.message);
//         res.status(500).send('Server Error')

//     }

// }
// )

router.post('/login',[check('mobile','Please include a valid mobile')
.isNumeric(),
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
    let user = await User.findOne({mobile});
    if(!user){
        res.status(400).json({errors:[{msg:'Invalid credentials'}]})
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        res.status(400).json({errors:[{msg:'Invalid credentials'}]})
    }
   
    const payload ={
        user:{
            id:user.id,
         
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

// router.post('/newForm',auth,isAdmin,async (req, res) => {

  
//     const { name, mobile, password, address, NbLandmark, tEmg, aCasulties, aPinvolved } = req.body;
  
//     try {
  
  
//      let  user = new User({
//         name,
//         mobile,
//         password,
//         address,
//         NbLandmark,
//         tEmg,
//         aCasulties,
//         aPinvolved
//       });
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(password,salt);
//       await user.save();
   
  
//       res.json(user);
  
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   });

router.post('/newForm',  async (req, res) => {
    const { name, mobile, password, address, NbLandmark, tEmg, aCasulties, aPinvolved } = req.body;
  
    try {
      let user = new User({
        name,
        mobile,
        password,
        address,
        NbLandmark,
        tEmg,
        aCasulties,
        aPinvolved
      });
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
  
      // send message using 11za API
      const authToken = 'U2FsdGVkX1/ug0OBB0k7o4i/C2fLQsC26whfAOfewPWDHATb0kdL+QElsbtYMiNQVH8PdYc3PpS+TG4P6S6dMACPuoX49vhOnirOfCPMtNy7//x+w9Jk8boA4nOCzTpfar6mPF/wExPqByo7EdjoF+UWqZrCB6iIYd2PRjIU1t1z3WNyUAhSk1t/zKMRvVgU'; // your auth token here
      const sendto = mobile; // mobile number of the user
      const originWebsite = 'https://11za.com/';
      const templateName = 'template_name';
      const data = `Hi ${name}, you are registered. Here are the details of your ${address}`;
      const language = 'en';
  
      const formData = new FormData();
      formData.append('authToken', authToken);
      formData.append('sendto', sendto);
      formData.append('originWebsite', originWebsite);
      formData.append('templateName', templateName);
      formData.append('data', data);
      formData.append('language', language);
  
      const options = {
        method: 'POST',
        url: 'https://app.11za.in/apis/template/sendTemplate',
        headers: {
          ...formData.getHeaders()
        },
        formData: {
          ...formData.getBuffer()
        }
      };
  
      const response = await axios(options);
      console.log(response.data);
  
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


//   router.post('/newForm',auth,isAdmin,async (req, res) => {

  
//     const { name, mobile, password, address, NbLandmark, tEmg, aCasulties, aPinvolved } = req.body;
  
//     try {
  
  
//      let  user = new User({
//         name,
//         mobile,
//         password,
//         address,
//         NbLandmark,
//         tEmg,
//         aCasulties,
//         aPinvolved
//       });
  
//       await user.save();
  
//       res.json(user);
  
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   });

router.post('/new',auth,isAdmin,async(req,res)=>{
    try {
        const { name, mobile, password, address, NbLandmark, tEmg, aCasulties, aPinvolved} = req.body;
        let user = new User({
            name,
            mobile,
            password,
            address,
            NbLandmark,
            tEmg,
            aCasulties,
            aPinvolved,
       
          });
      
          await user.save();
      
          res.json(user);
        return res
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router