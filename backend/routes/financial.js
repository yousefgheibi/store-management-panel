require("dotenv").config();
const express = require('express');
const db = require('../db');
const router = express.Router();


router.post('/add', (req, res) => {
    let financ = req.body;
    let query = `insert into financial (person_name, types, amount, description , user_email) value (?, ?, ?, ? ,?)`;
    db.query(query, [financ.person_name, financ.types, financ.amount, financ.description, financ.user_email], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "فایل مورد نظر ایجاد شد." });
        } else {
            return res.status(500).json(err);
        }
    })

})



router.get('/get/:email', (req, res) => {
    const email = req.params.email;
    let query = `select * from financial where user_email = ?`;
    db.query(query, [email], (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })
})



router.patch('/update', (req, res) => {
    let financ = req.body;
    let query = "update financial set person_name=? ,types=? ,amount=?, description=? where id=?";
    db.query(query, [financ.person_name, financ.types, financ.amount, financ.description, financ.id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "همچین فایلی وجود ندارد.!" });
            }
            return res.status(200).json({ message: "با موفقیت بروزرسانی شد." });
        } else {
            return res.status(500).json(err);
        }
    })
})


router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    let query = "delete from financial where id=?";
    db.query(query, [id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "همچین فایلی وجود ندارد!" });
            }
            return res.status(200).json({ message: "با موفقیت حذف شد." });
        } else {
            return res.status(500).json(err);
        }
    })
})



module.exports = router;