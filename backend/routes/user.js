require("dotenv").config();
const express = require('express');
const db = require('../db');
const router = express.Router();

const jwt = require("jsonwebtoken");
var auth = require("../services/auth");


router.get('/getByEmail/:id', (req, res) => {
    const id = req.params.id;
    let query = `select * from user where email = ?`;
    db.query(query, [id], (err, result) => {
        if (!err) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.post('/login', (req, res) => {
    const user = req.body;
    let query = `select email,password from user where email=?`;
    db.query(query, [user.email], (err, result) => {
        if (!err) {
            console.log(result);
            if (result.length <= 0 || result[0].password != user.password) {
                return res.status(401).json({ message: "Incorrect Username or password" });
            } else if (result[0].password == user.password) {
                const response = { email: result[0].email }
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' });
                res.status(200).json({ message: "Successfully logined.", token: accessToken, id: result[0].id });
            } else {
                return res.status(400).json({ message: "Something went wrong. Please try again later." });
            }
        } else {
            return res.status(500).json(err);
        }
    })

})







module.exports = router;