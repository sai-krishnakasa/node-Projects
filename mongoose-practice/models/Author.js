const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    DOB: {
        type: Date
    },
},
    {
        toJSON: { virtuals: true }
    })

authorSchema.virtual('age').get(function () {
    const today = new Date()
    const userDOB = this.DOB;
    const ageInMS = today - userDOB
    const ageInYears = Math.floor(ageInMS / (1000 * 60 * 60 * 24 * 365))
    return ageInYears;
})
    .set(() => {
        throw new Error("Can't set the  DOB Directly")
    })


authorSchema.methods.getMyBooks = function () {
    return mongoose.model('Book').find({ author: this._id })
}
authorSchema.statics.getAuthorBooks = function (authorName) {
    const regex = new RegExp(authorName, 'i');
    mongoose.model('Book').find().populate('author').exec()
        .then((books) => {
            const filteredBooks = books.filter(
                (book) => book.author && regex.test(book.author.name)
            );
            console.log(filteredBooks);
            return filteredBooks;
        })
        .catch((err) => {
            console.error(err);
        });

};


const Author = mongoose.model('Author', authorSchema)


const bookSchema = new mongoose.Schema({
    name: String,
    no_of_pages: {
        type: Number,
        validate: {
            validator: function (val) {
                if (val < 100) {
                    throw new Error("Min pages are 100")
                }
                if (val > 1000) {
                    throw new Error("Max pages are 1000")
                }
            }
        }
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
})

const Book = mongoose.model('Book', bookSchema);

module.exports = { Author, Book }