//Setup schema
const Book = require('../models/book');
exports.createNewBook =  (req,res) => {
    const createBook = req.body.book;
    Book.create({
        ...createBook
    },(err,newBook)=>{
        if(err){
            return res.status(500).json({err});
        }else {
            return res.status(201).json({"message": "new book created",newBook});
        }
    })
}

exports.fetchBooks = function (req, res) {
    let conditions = {};
    //check req query for filters
    if(req.query.category){
        //if there are filters, use them in Model.find query
        conditions.category = req.query.category;
    }
    if(req.query.author) {
        //if there are filters, use them in Model.find query
        conditions.author = req.query.author
    }
    //fetch all books
    Book.find(conditions,(err, books) =>{
        if(err){
            return res.status(404).json(err);
        }else{
            return res.status(200).json(books);
        }
    });
}

exports.fetchABook = (req, res) => {
    //Book.findOne(_id: req.params.id,(err, book)=> {
    Book.findById(req.params.id,(err, book)=> {
        if (err) {
            return res.status(500).json({message: err});
        }else if(!book){
            return res.status(404).json({message:"book with id " +req.params.id+"not found"});
        } else {
            res.status(202).json({message: "successful", book});
        }
    })
}

exports.updateABook = (req,res) => {
    const updateBook = req.body.book;
    Book.findByIdAndUpdate(req.params.id, {
        title: updateBook.title,
        author: updateBook.author,
        description: updateBook.description,
        category: updateBook.category,
        purchaseCount: updateBook.purchaseCount,
        imageUrl: updateBook.imageUrl,
        tags: updateBook.tags
    },(err, book) => {
        if(err){
            return res.status(500).json({message: err});
        } else if(!book){
            return res.status(404).json({message: "Book Not Found"});
        } else {
            book.save((err, savedBook) =>{
                if(err){
                    return res.status(500).json({message:err});
                } else{
                    return res.status(202).json({message:"Successful"});
                }
            });
        }
    })
}

exports.removeABook = (req,res) => {
    Book.findByIdAndDelete(req.params.id,(err, book) => {
        if(err){
            return res.status(500).json({message: err});
        } else if(!book){
            return res.status(404).json({message: "Book Not Found"});
        }
        else{
            res.status(200).json({message:"Book deleted successfully"});
        }
    })
}