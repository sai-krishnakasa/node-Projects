const fs = require('fs')
const csv = require('csvtojson')
const { Transform, pipeline } = require('stream')
const zlib = require('zlib')
const mongoose = require('mongoose')
const userModel = require('./user')



const main = async () => {
    await mongoose.connect("mongodb+srv://user:test1234@mydb.r7wjpqq.mongodb.net/users")

    const readStream = fs.createReadStream('./data/import.csv')

    const writeStream = fs.createWriteStream('./data/dest.csv')

    const myFilter = new Transform({
        writableObjectMode: true,
        readableObjectMode: true,
        transform(user, enc, cb) {
            if (!user.salary) {
                cb(null)
                return
            }
            else {
                cb(null, user)
            }
        }
    })

    const myTransform = new Transform({
        writableObjectMode: true,
        readableObjectMode: true,
        transform(chunk, enc, cb) {
            const user = {
                name: chunk.name.toLowerCase(),
                email: chunk.email.toLowerCase(),
                salary: chunk.salary === 'true'
            }
            cb(null, user)
        }
    })

    const convertToNdJson = new Transform({
        objectMode: true,
        transform(buffer, enc, cb) {
            const val = JSON.stringify(buffer) + " \n ";
            cb(null, val);
        }
    })

    const saveUser = new Transform({
        objectMode: true,
        async transform(user, enc, cb) {
            const val = JSON.stringify(user)
            await userModel.create({ val });
            cb(null);
        }
    })

    try {
        pipeline(
            readStream,
            csv({ delimiter: ';' }, { objectMode: true }),
            myTransform,
            myFilter,
            saveUser,
            // convertToNdJson,
            // zlib.createGzip(),
            // fs.createWriteStream('./data/export.ndjson.gz'),
            (err) => {
                if (err) {
                    console.error('Pipeline Error:', err);
                } else {
                    console.log('Pipeline Completed');
                }
            }
        );
    }
    catch (err) {
        console.log(err);
    }
    // INSTEAD OF CREATING THESE MANY PIPES WE CAN CREATE A 
    // PIPELINE THAT EXACTLY DOES THE SAME...

    /* readStream.pipe(
        csv({
            delimiter: ';'
        }, { objectMode: true })
    ).pipe(myTransform)
        .pipe(myFilter)
        .on('data', data => {
            console.log('>>>>DATA: ')
            console.log(data)
            writeStream.write(JSON.stringify(data) + '\n');
        })
        .on('error', error => {
            console.log('>>>>Error: ')
            console.log(error)
        })
        .on('end', () => {
            console.log('Stream Ended')
            writeStream.end();
        })

    */

    // const readStream = fs.createReadStream('./data/import.csv', {
    //     highWaterMark: 100
    // })

    // const writeStream = fs.createWriteStream('./data/dest.csv')

    // readStream.on('data', (buffer) => {
    //     console.log('>>>DATA: ')
    //     console.log(buffer.toString())
    //     writeStream.write(buffer);
    // })
    // readStream.on('end', () => {
    //     console.log("Stream has Ended");
    //     writeStream.end()
    // })



}

main()