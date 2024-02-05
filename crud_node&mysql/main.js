import express from 'express';
const app = express();

app.use(express.json());

import mysql from 'mysql2';

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123499",
    database: "basic_crud",
});

app.get('/', (req, res) => {
    res.send('Hi');
})
app.listen(5000, () => {
    console.log('Server listening on port 5000');
})

app.post("/users", async (req, res) => {
    try {
        const {name, address, country } = req.body;
        const [{insertId}] = await connection.promise().query(
            `INSERT INTO users (name, address, country)
            VALUES (?,?,?)`,
            [name, address, country]
        );
        res.status(202).json({
            message: "User Created",
        });
    } catch(err) {
        res.status(500).json({
            message:err,
        });
    }
});

app.get("/users", async (req, res) => {
    try {
        const data = await connection.promise().query(
            `SELECT * from users`
        );
        res.status(202).json({
            users: data[0],
        });
    } catch(err) {
        res.status(500).json({
            message:err,
        })
    }
})
