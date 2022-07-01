//Accessing Mongose package
const mongoose=require('mongoose');

var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
//Schema definition
const Schema= mongoose.Schema;

const BookSchema=new Schema({
    bookId : Number,
    bookName : String,
    bookImagePath: String,
    bookFilePath : String,
    // bookFile : {
    //     data: Buffer,
    //     contentType: String
    // },
    bookAuthor : String,
    bookCategory : String,
    bookDescription : String,
    // bookImage : {
    //     data: Buffer,
    //     contentType: String
    // }

});

//Model creation
var Bookdata= mongoose.model('books',BookSchema);
module.exports=Bookdata;