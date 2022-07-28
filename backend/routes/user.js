require("dotenv").config();
const express = require('express');
const db = require('../db');
const router = express.Router();

const jwt = require("jsonwebtoken");


router.post('/login', (req, res) => {
    const user = req.body;
    let query = `select * from user where email=?`;
    db.query(query, [user.email], (err, result) => {
        if (!err) {
            if (result.length <= 0 || result[0].password != user.password) {
                return res.status(401).json({ message: "ایمیل یا رمز عبور نادرست است !" });
            } else if (result[0].password == user.password) {
                const response = { email: result[0].email }
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' });
                res.status(200).json({ message: "ورود موفقیت آمیز بود.", token: accessToken, id: result[0].id });
            } else {
                return res.status(400).json({ message: "اشتباهی رخ داده ، لطفاً بعداً دوباره امتحان کنید." });
            }
        } else {
            return res.status(500).json(err);
        }
    })

})

router.get('/getInfo/:email', (req, res) => {
    const email = req.params.email;
    let query = `SELECT user.* from user where email = ?`;
    db.query(query, [email], (err, result) => {
        if (!err) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(500).json(err);
        }
    })
})


router.patch('/update', (req, res) => {
    const user = req.body;
    let query = "update user set fname=?,lname=?,phone_number=?,password=?,address=?,postal_code=? where email=?";
    db.query(query, [user.fname, user.lname, user.phone_number, user.password, user.address, user.postal_code, user.email], (err, result) => {
        if (!err) {
            if (result.length <= 0) {
                return res.status(404).json({ message: "همچین کاربری پیدا نشد." });
            }
            return res.status(200).json({ message: "اطلاعات کاربر با موفقیت بروز شد." })
        } else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;