require('dotenv').config()
const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
})

const con = conn.connect((err) => {
    if (err) console.log(err);
    else {
        console.log("DB CONNECTED")
    }
})

conn.execute(
    `
    CREATE TABLE IF NOT EXISTS employee (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        age INT,
        salary DECIMAL(10, 2),
        PRIMARY KEY (id)
      );
      `
)



// conn.query("select * from employee", (err, res) => {
//     console.log(res);
// })

module.exports = conn;
