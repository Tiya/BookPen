const express = require("express");
const Authordata = require('../models/AuthorData')
const authorRouter =express.Router();
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const cors = require('cors');
var bodyparser=require('body-parser');
require("dotenv")
  .config();

  authorRouter.use(cors());

  console.log("in addAuthorRoutes");
    authorRouter.use(bodyparser.urlencoded({
      limit: "200mb",
      type:'application/json'
      }));

      authorRouter.use(bodyparser.urlencoded({
        limit: "200mb",  
        extended: true,
        parameterLimit: 1000000
      }));
    var fs = require('fs');

    authorRouter.use(cors());

  authorRouter.use('/images', express.static(path.join('../frontend/src/assets/images/files')));
  const storage = multer.diskStorage({
    destination:(req,file, callback)=>{
      callback(null, '../frontend/src/assets/images/files')
    },
    filename:(req, file, callback)=>{
      callback(null, file.fieldname+Date.now()+path.extname(file.originalname));
    }
  })
  
  //Upload parameters for multer
  
  const upload = multer({ 
    storage: storage,
    limits:{
      fileSize: 10000000     //upto 10MB files only
    },
    fileFilter:function(req,file,cb){
      checkFileType(file, cb);
    }
  });
  
  
  //Checking file types we are inputing
  
  function checkFileType(file, cb){
  
    // Only Image type extension
    const filetypes = /jpeg|jpg|png|gif/; 
    //Checking extension
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
    //Check mime
    const mimetype=filetypes.test(file.mimetype);
    if(mimetype&&extname){
      return cb(null, true);
    }else{
      cb('Error: Only Images allowed');
    }
  }


  authorRouter.get('/api/',verifyToken, function (req, res) {
    Authordata.find()
            .then(function(authors){
              // console.log(authors);
                res.send(authors);
            })
  })    

  authorRouter.get('/api/:id',verifyToken,  (req, res) => {
  
    const id = req.params.id;
    Authordata.findOne({"_id":id})
      .then((author)=>{
          res.send(author);
      });
  })

  authorRouter.post('/api/insert',verifyToken, upload.fields([
    {name: "image", maxCount: 1},
  ]),function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE')
    console.log("images:::"+req.files.image[0].filename);

    var author = {       
        authorname : req.body.authorname,
        aboutauthor : req.body.aboutauthor,
        authorImagePath : req.files.image[0].filename,
        // authorimage: {
        //         data: fs.readFileSync(path.join('../frontend/src/assets/images/files/' + req.files.image[0].filename)), 
        //         contentType: 'image/png',
        //             }
   }       
   
   var author = new Authordata(author);
  // console.log(author);
   author.save();
});


authorRouter.delete('/api/remove/:id',verifyToken,(req,res)=>{
   
  id = req.params.id;
  console.log(id);
  Authordata.findByIdAndDelete({"_id":id})
  .then(()=>{
      console.log('success')
      res.send();
  })
})

authorRouter.put('/api/update',verifyToken, upload.fields([
  {name: "file", maxCount: 1},
  {name: "image", maxCount: 1},
]),(req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
  res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE')
  console.log(req.body)
 // console.log("file::::update:::"+req.files.file[0].filename);
  //console.log("images:::update:::"+req.files.image[0].filename);
  id=req.body._id,
        authorname = req.body.authorname,
        aboutauthor = req.body.aboutauthor,
//  authorImagePath = req.files.image[0].filename,

//   authorimage={
//     data: fs.readFileSync(path.join('../frontend/src/assets/images/files/' + req.files.image[0].filename)), 
//   contentType: 'image/png',      
 
  Authordata.findByIdAndUpdate({"_id":id},
                              {$set:{
                              "authorname":authorname,
                              "aboutauthor":aboutauthor,
                              // "authorImagePath":authorImagePath,
                              // "authorimage":authorimage,
                              }})
 .then(function(){
  
     res.send();
 })
})


  module.exports=authorRouter;

  function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorised Request');
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token==='null'){
        return res.status(401).send('Unauthorised Request');
    }
    let payload = jwt.verify(token, 'secretKey');
    if(!payload){
        return res.status(401).send('Unauthorised Request');
    }
    req.userId = payload.subject;
    next()
}