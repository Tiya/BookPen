// Accessing Mongoose Package
const mongoose = require("mongoose");

var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})


// Schema Definition from Mongoose.Schema package
const Schema = mongoose.Schema;

// Creating a new Schema named BookSchema using constructor Schema
const AuthorSchema = new Schema({
    authorname:{type:String,required: true },
    // authorimage: {
    //     data: Buffer,
    //     contentType: String
    //     // required: true
    // },
    aboutauthor: {type:String,required: true },
    authorImagePath: String

});

// In order to use the new Schema created we need to create a Model using mongoose.model package ("Collection Name", "Schema Name")
const Authordata = mongoose.model("authordata",AuthorSchema);

// Exporting the Model created (Authordata)
module.exports = Authordata