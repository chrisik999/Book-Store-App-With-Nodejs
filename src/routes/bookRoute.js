const express = require('express');
const router = express.Router();

const bookControllers = require('../controllers/bookControllers');
//get all books
router.get("/books",bookControllers.fetchBooks );

//get a book
router.get('/books/:id', bookControllers.fetchABook);

//create a book
router.post('/books',bookControllers.createNewBook);

//update a book
router.put('/books/:id',bookControllers.updateABook);

//delete a book
router.delete('/books/:id',bookControllers.removeABook);


module.exports = router;

//delete a book
// router.delete('/books/:id',(req,res) => {
//     Book.findByIdAndDelete(req.params.id,(err, book) => {
//         if(err){
//             return res.status(500).json({message: err});
//         } else if(!book){
//             return res.status(404).json({message: "Book Not Found"});
//         }
//         else{
//             book.deleteOne((err,done) =>{
//                 if(err){
//                     return res.status(500).json({message:err});
//                 } else{
//                     res.status(200).json({message:"Book deleted successfully"});
//                 }
//             })
//         }
//     })
// })