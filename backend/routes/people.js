require("dotenv").config();
const express = require('express');
const db = require('../db');
const router = express.Router();


router.post('/add', (req, res) => {
    let person = req.body;
    let query = `insert into people (name, category, phone, address , credit) value (?, ?, ?, ?, ?)`;
    db.query(query, [person.name, person.category, person.phone, person.address, person.credit], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "person Added Successfully." });
        } else {
            return res.status(500).json(err);
        }
    })

})



router.get('/get', (req, res) => {
    let query = `select * from people order by name`;
    db.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
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
                return res.status(404).json({ message: "person id does not found!" });
            }
            return res.status(200).json({ message: "person Updated Successfully." });
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
                return res.status(404).json({ message: "person id does not found!" });
            }
            return res.status(200).json({ message: "person Deleted Successfully." });
        } else {
            return res.status(500).json(err);
        }
    })
})



module.exports = router;