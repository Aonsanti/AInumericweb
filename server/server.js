const express = require('express');
const mysql = require('mysql2');
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json());


const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database:'numericalmethod',
    port:3307
});

db.connect((err)=>{
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

app.get('/',(req , res) => {
    return res.json("This is from backend")
});

app.get('/bisection' , (req , res)=>{
    const sql = "SELECT * FROM bisection";
    db.query(sql,(err , data) =>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/bisection', (req, res) => {
    const { function_text, lower_bound, upper_bound, result } = req.body;
    const sql = "INSERT INTO bisection (function_text, lower_bound, upper_bound, result, created_at) VALUES (?, ?, ?, ?, NOW())";
    db.query(sql, [function_text, lower_bound, upper_bound, result], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.status(201).json({ message: "Data inserted successfully", id: result.insertId });
    });
});

app.get('/false_position' , (req , res)=>{
    const sql = "SELECT * FROM false_position";
    db.query(sql,(err , data) =>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/graphical' , (req , res)=>{
    const sql = "SELECT * FROM graphical";
    db.query(sql,(err , data) =>{
        if(err) return res.json(err);
        return res.json(data);
    })
})


app.get('/newton_raphson' , (req , res)=>{
    const sql = "SELECT * FROM newton_raphson";
    db.query(sql,(err , data) =>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/one_point' , (req , res)=>{
    const sql = "SELECT * FROM one_point";
    db.query(sql,(err , data) =>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/secant' , (req , res)=>{
    const sql = "SELECT * FROM secant";
    db.query(sql,(err , data) =>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(8080 , () => {
    console.log("Server started on port 8080");
});