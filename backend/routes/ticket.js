require("dotenv").config();
const express = require('express');
const db = require('../db');
const router = express.Router();


router.post('/add', (req, res) => {
    let tiket = req.body;
    let query = `INSERT INTO tiket (title, subject, message, user_email) VALUES (?, ?, ?, ?)`;
    db.query(query, [tiket.title, tiket.subject, tiket.message, tiket.user_email], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "ایمیل با موفقیت ارسال شد." });
        } else {
            return res.status(500).json(err);
        }
    })

})



router.get('/get/:email', (req, res) => {
    const email = req.params.email;
    let query = `select * from tiket where user_email = ? order by id DESC`;
    db.query(query, [email], (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })
})



router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    let query = "delete from tiket where id=?";
    db.query(query, [id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: " ایمیل مورد نظر پیدا نشد!" });
            }
            return res.status(200).json({ message: "ایمیل با موفقیت حذف شد." });
        } else {
            return res.status(500).json(err);
        }
    })
})



module.exports = router;