const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {Schema} = mongoose;
const dbUri = "mongodb://localhost:27017/book-store";

mongoose.connect(dbUri,{
    UseUnifiedTopology: true,
    UseNewUrlParser: true,
    UseFindAndModify: false
},(err) =>{
    if(err) {
        console.log({err});
    } else {
        console.log("mongodb has been connected");
    }

})

app.use(express.json());

const bookSchema = new Schema({
    title: String,
    author: String,
    description:String,
    category:String,
    purchaseCount: Number,
    imageUrl: String,
    tags: Array
})

const book = mongoose.model('book',bookSchema);
//get all books

//get a book
//create a book
app.post('/books',(req,res) => {
    const createBook = req.body.book;
    console.log(createBook);
    book.create({
    
    })
})
//update a book
//delete a book

//set port number
const port = process.env.Port || 3000;
app.listen(port, ()=>{
    console.log("server created on portr "+ port);
})