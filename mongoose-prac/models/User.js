// const mongoose = require('mongoose')

(
    function () {
        const { Readable, Writable } = require('stream');

        // Creating a readable stream
        const readableStream = new Readable({
            read() {
                // Push data to the stream
                this.push('Hello, ');
                this.push('world!');
                this.push(null); // Signal the end of data
            }
        });

        // Creating a writable stream
        const writableStream = new Writable({
            write(chunk, encoding, callback) {
                // Process the data received from the readable stream
                console.log(chunk.toString());
                callback();
            }
        });

        // Piping the readable stream to the writable stream
        readableStream.pipe(writableStream);

    })();



// const userSchema = new mongoose.Schema({
//     first_name: String,
//     last_name: String,
//     email: {
//         type: String,
//         unique: true,
//         index: true,
//     },
//     age: Number,
//     is_active: Boolean,
// }, {
//     methods: {
//         getName(cb) {
//             return this.first_name + " " + this.last_name
//         }
//     }
// })

// const user = mongoose.model('user', userSchema)

// module.exports = { user };