const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
let alert = require('alert'); 


// const admin = require('../data/admin');

// const db = "mongodb+srv://admin:1289lash@users.rs1bqhv.mongodb.net/?retryWrites=true&w=majority";

const db = "mongodb+srv://FSDGroup3:Fsdgp3.123@cluster0.1f3izav.mongodb.net/BookNPen?retryWrites=true&w=majority";

mongoose.connect(db, err=>{
    if(err){
        console.log('Error!' + err);
    }
    else{
        console.log('Connected to MongoDB')
    }
})

router.get('/api/',(req,res)=>{
    res.send('Hello from API route');
})

router.post('/api/signup', (req,res)=>{

    
    let userData = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      if((userData.email)=='admin@domain.com'&&(userData.password)=='admin1234'){
       alert("Hi! You can't Sign Up with Admin Credentials")
        }
         else {
            userData.role = 'Author';
          // let user = new User(userData);
          userData.save((error,resgisteredUser)=>{
              if(error){
                  console.log(error);
              }
              else{
                  let payload={subject:resgisteredUser};
                  let token =jwt.sign(payload,'secretKey')
                  res.status(200).send({token});
                  // res.status(200).send(resgisteredUser);
              }
          })
      }
    }
)

router.post('/api/login',(req,res)=>{
    let userData = new User({
        email: req.body.email,
        password: req.body.password
      });

      if(userData.email=="admin@domain.com" && userData.password=="admin1234")
      {
        User.findOne({email : userData.email},(error,user)=>
        {
            if(error)
            {
                console.log(error);
            }
            else
            if(!user.email)
            {
            userData.username="Admin";
            userData.role="Admin";
            let payload={subject:userData};
            let token =jwt.sign(payload,'secretKey')
            userData.save()
            res.status(200).send({token});
            }
            else{
            let payload={subject:user};
            let token =jwt.sign(payload,'secretKey')
            res.status(200).send({token});
            }
        })
        }
        else{
    User.findOne({email : userData.email},(error,user)=>
    {
        if(error)
        {
            console.log(error);
        }
        else{
            if(!user)
            {
                res.status(401).send('Invalid Email');
            }
            else
            if(user.password!== userData.password)
            {
                res.status(401).send('Invalid Password');
            }
            else{
                let payload={subject:user};
                let token =jwt.sign(payload,'secretKey')
                res.status(200).send({token});
                // res.status(200).send(user);
            }
        }
    })
      }}
)

module.exports = router;