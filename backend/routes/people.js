require("dotenv").config();
const express = require('express');
const db = require('../db');
const router = express.Router();


router.post('/add', (req, res) => {
    let person = req.body;
    let query = `insert into people (name, category, phone, address , credit , user_email) value (?, ?, ?, ?, ? ,?)`;
    db.query(query, [person.name, person.category, person.phone, person.address, person.credit, person.user_email], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "شخص مورد نظر ایجاد شد." });
        } else {
            return res.status(500).json(err);
        }
    })

})



router.get('/get/:email', (req, res) => {
    const email = req.params.email;
    let query = `select * from people where user_email = ? order by id DESC`;
    db.query(query, [email], (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.get('/getSize/:email', (req, res) => {
    const email = req.params.email;
    let query = `SELECT COUNT(id) as count FROM people where user_email = ?`;
    db.query(query, [email], (err, result) => {
        if (!err) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.get('/getById/:id', (req, res) => {
    const id = req.params.id;
    let query = `SELECT people.* from people where id = ?`;
    db.query(query, [id], (err, result) => {
        if (!err) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.patch('/update', (req, res) => {
    let person = req.body;
    let query = "update people set name=? ,category=? ,phone=? ,address=?, credit=? where id=?";
    db.query(query, [person.name, person.category, person.phone, person.address, person.credit, person.id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "همچین شخصی وجود ندارد.!" });
            }
            return res.status(200).json({ message: "با موفقیت بروزرسانی شد." });
        } else {
            return res.status(500).json(err);
        }
    })
})


router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    let query = "delete from people where id=?";
    db.query(query, [id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "همچین شخصی وجود ندارد!" });
            }
            return res.status(200).json({ message: "با موفقیت حذف شد." });
        } else {
            return res.status(500).json(err);
        }
    })
})



module.exports = router;