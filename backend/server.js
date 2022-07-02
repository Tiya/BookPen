const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const api = require('./routes/api')
const path=require('path');


const app =express();
app.use(cors());

app.use(bodyparser.json({
    limit: "200mb",
    type:'application/json'
  }));
  app.use(bodyparser.urlencoded({
    limit: "200mb",  
    extended: true,
    parameterLimit: 1000000
  }));
  app.use(express.static(__dirname+'/dist'));
app.use('/api',api);
app.get('/',(req,res)=>{
    // res.send('Hello from Server');
    res.sendFile(path.join(__dirname+'/dist/index.html'));
})

const booksRouter=require('./routes/addBookRoutes');
app.use('/books',booksRouter);

const authorRouter=require('./routes/addAuthorRoutes');
app.use('/authors',authorRouter);

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });