const express=require(`express`);
const booksRouter=express.Router();
const Bookdata = require('../models/BookData');
const multer=require('multer')
const jwt=require('jsonwebtoken')
const path = require('path');
var fs = require('fs');
var sharp = require('sharp');

console.log("in addBookRoutes");
  const cors = require('cors');
  var bodyparser=require('body-parser');
  booksRouter.use(bodyparser.json({
    limit: "200mb",
    type:'application/json'
  }));
  booksRouter.use(bodyparser.urlencoded({
    limit: "200mb",  
    extended: true,
    parameterLimit: 1000000
  }));
  var fs = require('fs');
// var dir = '../frontend/src/assets/images';

//   if (!fs.existsSync(dir)){
//     // console.log("new: "+dir);
//       fs.mkdirSync(dir);
//   }
  // console.log("old: "+dir);
  
  booksRouter.use(cors());


 // booksRouter.use('/api/images', express.static(path.join('../frontend/src/assets/images/files')));
  const storage = multer.diskStorage({
    destination:(req,file, callback)=>{
      callback(null, '../frontend/src/assets/images/files')
    },
    filename:(req, file, callback)=>{
      callback(null, file.fieldname+Date.now()+path.extname(file.originalname));
    }
  })
  var upload = multer({
    storage: storage,
    limits:{
      fileSize: 10000000  //upto 10MB files only
    },
    fileFilter:function(req,file,callback){
      checkFileType(file, callback);
    }
  })
//Check file type
function checkFileType(file, callback){

  // allowed extension
  // const filetypes = /jpeg|jpg|png|gif/;
  const filetypes = /jpeg|jpg|png|gif|pdf/;
  //check extension
  const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
  //check mime
  const mimetype=filetypes.test(file.mimetype);
  if(mimetype&&extname){
    return callback(null, true);
  }else{
    callback('Error: Images only');
  }
}
booksRouter.get('/api/:id',verifyToken,  (req, res) => {
  
  const id = req.params.id;
  Bookdata.findOne({"_id":id})
    .then((book)=>{
        res.send(book);
    });
})

  booksRouter.get('/api/',verifyToken, function (req, res) {
    Bookdata.find()
            .then(function(books){
                res.send(books);
            })
  })    

  booksRouter.post('/api/insert',verifyToken,upload.fields([
    {name: "file", maxCount: 1},
    {name: "image", maxCount: 1},
  ]),function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE')
    //console.log(req.body.bookName);
    //const file=req.files;
    console.log("file::::"+req.files.file[0].filename);
    console.log("images:::"+req.files.image[0].filename);

   // Configuring thumbnail image
 // let compressedImage =path.join('../frontend/src/assets/images/files/' + req.files.file[0].filename);
  //sharp(req.files.image[0].filename).resize(200,200).png({quality : 50}).toFile('../frontend/src/assets/images/files/' + req.files.image[0].filename);
   
    var book = {       
       
        bookName : req.body.bookName,
        bookAuthor : req.body.bookAuthor,
        bookCategory : req.body.bookCategory,
        bookDescription : req.body.bookDescription,
        bookImagePath : req.files.image[0].filename,
        bookFilePath : req.files.file[0].filename,
      //   bookFile: {
      //     data:fs.readFileSync(path.join('../frontend/src/assets/images/files/' + req.files.file[0].filename)),
      //     contentType: 'application/pdf',
      //   }, 
      //   bookImage:{
      //     data: fs.readFileSync(path.join('../frontend/src/assets/images/files/' + req.files.image[0].filename)), 
      //   contentType: 'image/png',
      // }
               
   }       
   
   var book = new Bookdata(book);
  // console.log(book);
 // console.log(book.bookImage);
   book.save();
});

booksRouter.delete('/api/remove/:id',verifyToken,(req,res)=>{
   
  id = req.params.id;
  console.log(id);
  Bookdata.findByIdAndDelete({"_id":id})
  .then(()=>{
      console.log('success')
      alert("Book deleted successfully");
      res.send();
  })
})

booksRouter.put('/api/update',verifyToken, upload.fields([
  {name: "file", maxCount: 1},
  {name: "image", maxCount: 1},
]),(req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
  res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE')
  console.log(req.body)
 // console.log("file::::update:::"+req.files.file[0].filename);
  //console.log("images:::update:::"+req.files.image[0].filename);
  id=req.body._id,
  bookName = req.body.bookName,
  bookAuthor = req.body.bookAuthor,
  bookCategory = req.body.bookCategory,
  bookDescription = req.body.bookDescription,
//  bookImagePath = req.files.image[0].filename,
//  bookFilePath = req.files.file[0].filename,
//   bookImage={
//     data: fs.readFileSync(path.join('../frontend/src/assets/images/files/' + req.files.image[0].filename)), 
//   contentType: 'image/png',
// },
//   bookFile= {
//               data:fs.readFileSync(path.join('../frontend/src/assets/images/files/' + req.files.file[0].filename)),
//               contentType: 'application/pdf',
//             }
 //           console.log(bookImagePath)        
 
  Bookdata.findByIdAndUpdate({"_id":id},
                              {$set:{
                              "bookName":bookName,
                              "bookAuthor":bookAuthor,
                              "bookCategory":bookCategory,
                              "bookDescription":bookDescription,
                              // "bookImagePath":bookImagePath,
                              // "bookFilePath":bookFilePath,
                              // "bookImage":bookImage,
                              // "bookFile":bookFile,
                              }})
 .then(function(){
  
     res.send();
 })
})

  module.exports=booksRouter;


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