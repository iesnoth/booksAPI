//dependencies
//NONE OF THESE HAVE .JS
const express = require('express')
const books = express.Router()
const Book = require(`./model`)

//find all the books
books.get(`/`,(req,res) => {
    Book.find()
    .then(foundBooks =>{
        res.status(200).json({"goodjob":"you did it"})
    })
    .catch(err =>{
        res.status(404).json({
            "errorCode": "LIST_NOT_FOUND",
            "errorMessage": "The list of books isn't at this address."
        })

        })
})

//create new
books.post(`/`,(req,res)=>{
    Book.create(req.body)
    .then(() =>{
        res.status(201).redirect(`/books`)
    })
    .catch(err =>{
        res.status(404).json({
            "errorCode": "BOOK_NOT_ADDED",
            "errorMessage": "Your book was not added to the list."
        })

        })
})

//find an individual book by id
books.get('/:id',(req,res)=>{
    Book.findById(req.param.id)
    .then(foundBook =>{
        if (foundBook == null) {
            res.status(400).json({
                "errorCode": "BOOK_NOT_FOUND",
                "errorMessage": "The book you're looking for doesn't exist. Please check your information and try again."
            })
        } else {
            res.status(200).json(foundBook)
        }
        })
})

//not sure how this updates the book
books.put(`/:id`,(req,res)=>{
    Book.findByIdAndUpdate(req.param.id, req.body)
    .then(()=>{
        res.status(201).redirect(`books/${req.params.id}`)
    })
    .catch(err =>{
        res.status(400).json({
            "errorCode": "EDIT_NOT_ACCEPTED",
            "errorMessage": "This edit was not processed."
        })

        })
})

//delete books
books.delete(`/:id`,(req,res)=>{
    Book.findByIdAndDelete(req.params.id)
    .then(deletedBook => {
        res.json({
            message: "Delete successful."
        })
    })
    .catch(err =>{
        res.status(404).json({
            "errorCode": "DELETE_UNSUCCESSFUL",
            "errorMessage": "This delete was not processed."
        })

        })
})


module.exports = books