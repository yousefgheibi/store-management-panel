require("dotenv").config();
const express = require('express');
const db = require('../db');
const router = express.Router();


router.post('/add', (req, res) => {
    let product = req.body;
    let query = `insert into product (code, category, name, unit , bprice , sprice , stock) value (?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [product.code, product.category, product.name, product.unit, product.bprice, product.sprice, product.stock], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "محصول مورد نظر با موفیت اضافه شد." });
        } else {
            return res.status(500).json(err);
        }
    })

})



router.get('/get', (req, res) => {
    let query = `select * from product order by name`;
    db.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })
})


router.patch('/update', (req, res) => {
    let product = req.body;
    let query = "update product set code=? ,category=? ,name=? ,unit=?, bprice=? , sprice=? , stock=? where id=?";
    db.query(query, [product.code, product.category, product.name, product.unit, product.bprice, product.sprice, product.stock, product.id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "محصول مورد نظر پیدا نشد!" });
            }
            return res.status(200).json({ message: "با موفقیت بروزرسانی شد." });
        } else {
            return res.status(500).json(err);
        }
    })
})


router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    let query = "delete from product where id=?";
    db.query(query, [id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "محصول مورد نظر پیدا نشد!" });
            }
            return res.status(200).json({ message: "محصول مورد نظر با موفقیت حذف شد." });
        } else {
            return res.status(500).json(err);
        }
    })
})



module.exports = router;