const mongoose = require('mongoose')
const { Author, Book } = require('./models/Author.js')
const express = require('express')

const app = express()

mongoose.connect('mongodb+srv://user:test1234@mydb.r7wjpqq.mongodb.net/mongoose-practice', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((err, res) => console.log("DB Connected"));

// Get the default connection
const db = mongoose.connection;


const createData = async () => {
    const kasa = await Author.create({ name: 'Kasa', DOB: new Date("2002-04-26") })
    const rahul = await Author.create({ name: 'Rahul', DOB: new Date("2002-10-20") })
    const akash = await Author.create({ name: 'Akash', DOB: new Date("2002-04-26") })

    b1 = await Book.create({ name: 'B1', no_of_pages: 190, author: kasa._id })
    b2 = await Book.create({ name: 'B2', no_of_pages: 1600, author: kasa._id })
    b3 = await Book.create({ name: 'B3', no_of_pages: 290, author: kasa._id })
    b4 = await Book.create({ name: 'B4', no_of_pages: 1600, author: rahul._id })
    b5 = await Book.create({ name: 'B5', no_of_pages: 1900, author: akash._id })
}



app.listen(8000, () => {
    console.log("Server started")
    setTimeout(async () => {

        Book.aggregate([
            { $lookup: { from: 'authors', localField: 'author', foreignField: '_id', as: 'author' } },
            { $unwind: '$author' },
            { $group: { _id: '$author.name', count: { $sum: 1 } } }
        ])
            .exec()
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.error(error);
            });

        const kasa = await Author.findOne({ name: "Kasa" })
        console.log(kasa.age)
        // kasa.age = 25
        // console.log(kasa.age)
        // console.log(await kasa.getMyBooks())
        // console.log(await Author.getAuthorBooks('rahul'));
        // const books = await Book.find({ author: kasa._id });
        // console.log(books);
    }, 2000)
})


