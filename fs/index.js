const fs = require('fs').promises;
const path = require('path');

(async () => {
    const data = await fs.readFile(path.join(__dirname, 'files', 'starter.txt'))
    console.log(data);
})()

const fileOps = async () => {
    try {
        const data = await fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8')
        const writed = await fs.writeFile(path.join(__dirname, 'files', 'new_writer.txt'), data)
        const appended = await fs.appendFile(path.join(__dirname, 'files', 'new_writer.txt'), '\n\n Yes it is!..')
        await fs.rename(path.join(__dirname, 'files', 'new_writer.txt'), path.join(__dirname, 'files', 'writer.txt'))
        const new_data = await fs.readFile(path.join(__dirname, 'files', 'writer.txt'), 'utf-8')
        console.log(new_data)

    }
    catch (err) {
        console.log(err);
    }
}

fileOps()

// fs.writeFile(path.join(__dirname, 'files', 'writer.txt'), 'Nice to meet you', (err) => {
//     if (err) throw err;
//     console.log("Writing complete");
//     fs.appendFile(path.join(__dirname, 'files', 'writer.txt'), '\n\n Yes it is!..', (err) => {
//         if (err) throw err;
//         console.log("Append complete");
//         fs.rename(path.join(__dirname, 'files', 'writer.txt'), path.join(__dirname, 'files', 'new_writer.txt'), (err) => {
//             if (err) throw err;
//             console.log("Rename complete");
//         })
//     })
// })

