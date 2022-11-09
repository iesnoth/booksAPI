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
        res.status(400).json({
            "errorCode": "LIST_NOT_FOUND",
            "errorMessage": "The list of books isn't at this address."
        })

        })
})

module.exports = books