require("dotenv").config();
const express = require('express');
const db = require('../db');
const router = express.Router();


router.post('/add', (req, res) => {
    let product = req.body;
    let query = `insert into product (code, category, name, unit , price , stock,user_email) value (?, ?, ?, ?, ?, ?, ? )`;
    db.query(query, [product.code, product.category, product.name, product.unit, product.price, product.stock, product.user_email], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "محصول مورد نظر با موفیت اضافه شد." });
        } else {
            return res.status(500).json(err);
        }
    })

})

//select * FROM product WHERE `category` = 'کالا' and `user_email` = 'admin@gmail.com';

router.get('/get/:email', (req, res) => {
    const email = req.params.email;
    let query = `select * from product where user_email = ?`;
    db.query(query, [email], (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })
})


router.get('/getKhadamat/:email', (req, res) => {
    const email = req.params.email;
    let query = `select * FROM product WHERE category = 'خدمات' and user_email = ?`;
    db.query(query, [email], (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.get('/getKala/:email', (req, res) => {
    const email = req.params.email;
    let query = `select * FROM product WHERE category = 'کالا' and user_email = ?`;
    db.query(query, [email], (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })
})


router.get('/getById/:id', (req, res) => {
    const id = req.params.id;
    let query = `select * from product where id = ?`;
    db.query(query, [id], (err, result) => {
        if (!err) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(500).json(err);
        }
    })
})


router.get('/get/:email', (req, res) => {
    const email = req.params.email;
    let query = `select * from product where user_email = ?`;
    db.query(query, [email], (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })
})


router.patch('/update', (req, res) => {
    let product = req.body;
    let query = "update product set code=? ,category=? ,name=? ,unit=?, price=?  , stock=? where id=?";
    db.query(query, [product.code, product.category, product.name, product.unit, product.price, product.stock, product.id], (err, result) => {
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
