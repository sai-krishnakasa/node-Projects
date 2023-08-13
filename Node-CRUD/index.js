const conn = require('./connection')
const express = require('express')
const controller = require('./controllers/controller')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.listen(process.env.PORT || 8000)

app.get('/', (req, res) => {
    conn.query("select * from employee", (err, rows) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(rows);
        }
    })
})

app.get('/:id', (req, res) => {
    const id = req.params.id;
    conn.query(`select * from employee where id = ${id}`, (err, rows) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(rows[0]);
        }
    })
})

app.post('/', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const salary = req.body.salary;
    conn.query(`insert into employee(name,age,salary) values(?,?,?)`, [name, age, salary], (err, rows) => {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err))
        }
        else {
            res.send(rows[0]);
        }
    })
})


app.put('/:id', (req, res) => {
    const id = req.params.id;
    const { name, age, salary } = req.body;
    let query = `UPDATE employee SET`;
    if (name) {
        query += ` name='${name}',`;
    }
    if (age) {
        query += ` age=${age},`;
    }
    if (salary) {
        query += ` salary=${salary},`;
    }
    query = query.slice(0, -1); // remove the last comma
    query += ` WHERE id=${id}`;
    conn.query(query, (err, rows) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        console.log(rows.affectedRows === undefined)
        if (rows.affectedRows === undefined) {
            conn.query(`insert into employee(id,name,age,salary) values(?,?,?,?)`, [id, name, age, salary], (err, rows2) => {
                if (err) {
                    console.log(err);
                    res.send(JSON.stringify(err))
                }
                else {
                    console.log(rows2)
                    return res.redirect(`/${id}`)
                }
            })
        }
        else {
            console.log(rows);
            res.send(rows);
        }
    })
})

