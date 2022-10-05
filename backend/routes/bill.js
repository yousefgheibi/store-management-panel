const express = require('express');
const db = require('../db');
const router = express.Router();
let ejs = require('ejs');
let pdf = require('html-pdf');
let path = require('path');
var fs = require('fs');
var uuid = require('uuid');

function generateUID() {
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}

router.post('/generateReport', (req, res) => {
    const generatedUuid = generateUID();
    const orderDetails = req.body;
    var productDetailsReport = JSON.parse(orderDetails.productDetails);

    let query = "insert into bill (name,uuid,typeFactor,paymentMethod,total,productDetails,description,user_email) values(?,?,?,?,?,?,?,?)";
    db.query(query, [orderDetails.name, generatedUuid, orderDetails.typeFactor, orderDetails.paymentMethod, orderDetails.total, orderDetails.productDetails, orderDetails.description, orderDetails.email], (err, result) => {
        if (!err) {
            ejs.renderFile(path.join(__dirname, '', "report.ejs"), { productDetails: productDetailsReport, name: orderDetails.name, typeFactor: orderDetails.typeFactor, paymentmethod: orderDetails.paymentMethod, totalAmount: orderDetails.total, description: orderDetails.description, generatedUuid: generatedUuid, address: orderDetails.address, phone: orderDetails.phone }, (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                } else {
                    pdf.create(result).toFile('./generated_pdf/' + generatedUuid + ".pdf", (err, data) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json(err);
                        } else {

                            return res.status(200).json({ message: 'فاکتور با موفقیت ثبت شد.', uuid: generatedUuid });
                        }
                    })
                }
            })
        } else {
            return res.status(500).json(err);
        }
    })
})


router.post('/getPdf', (req, res) => {
    const orderDetails = req.body;
    const pdfPath = './generated_pdf/' + orderDetails.uuid + '.pdf';
    if (fs.existsSync(pdfPath)) {
        res.contentType("application/pdf");
        fs.createReadStream(pdfPath).pipe(res);
    } else {
        var productDetailsReport = JSON.parse(orderDetails.productDetails);
        ejs.renderFile(path.join(__dirname, '', "report.ejs"), { productDetails: productDetailsReport, name: orderDetails.name, typeFactor: orderDetails.typeFactor, paymentmethod: orderDetails.paymentMethod, totalAmount: orderDetails.total, description: orderDetails.description, generatedUuid: generatedUuid, address: orderDetails.address, phone: orderDetails.phone }, (err, result) => {
            if (err) {
                return res.status(500).json(err);
            } else {
                pdf.create(result).toFile('./generated_pdf/' + orderDetails.uuid + ".pdf", (err, data) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json(err);
                    } else {
                        res.contentType("application/pdf");
                        fs.createReadStream(pdfPath).pipe(res);
                    }
                })
            }
        })
    }

})



router.get('/getBills/:email', (req, res) => {
    const email = req.params.email;
    let query = "select * from bill where user_email = ? order by id DESC";
    db.query(query, [email], (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })
})


router.get('/getBuyTotalMonth/:email', (req, res) => {
    const email = req.params.email;
    let query = "SELECT DATE_FORMAT(created_at, '%Y-%m') AS month , SUM(total) as STotal FROM bill WHERE created_at > created_at-30 AND user_email = ? AND typeFactor = 'خرید' GROUP BY month ORDER BY month DESC;";
    db.query(query, [email], (err, result) => {
        if (!err) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.get('/getSellTotalMonth/:email', (req, res) => {
    const email = req.params.email;
    let query = "SELECT DATE_FORMAT(created_at, '%Y-%m') AS month , SUM(total) as STotal FROM bill WHERE created_at > created_at-30 AND user_email = ? AND typeFactor = 'فروش' GROUP BY month ORDER BY month DESC;";
    db.query(query, [email], (err, result) => {
        if (!err) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(500).json(err);
        }
    })
})


router.get('/getBuyTotalYear/:email', (req, res) => {
    const email = req.params.email;
    let query = "SELECT DATE_FORMAT(created_at, '%Y') AS year , SUM(total) as STotal FROM bill WHERE created_at > created_at-365 AND user_email = ? AND typeFactor = 'خرید' GROUP BY year ORDER BY year DESC;";
    db.query(query, [email], (err, result) => {
        if (!err) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(500).json(err);
        }
    })
})


router.get('/getSellTotalYear/:email', (req, res) => {
    const email = req.params.email;
    let query = "SELECT DATE_FORMAT(created_at, '%Y') AS year , SUM(total) as STotal FROM bill WHERE created_at > created_at-365 AND user_email = ? AND typeFactor = 'فروش' GROUP BY year ORDER BY year DESC;";
    db.query(query, [email], (err, result) => {
        if (!err) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(500).json(err);
        }
    })
})


router.get('/getSize/:email', (req, res) => {
    const email = req.params.email;
    let query = `SELECT COUNT(id) as count FROM bill where user_email = ?`;
    db.query(query, [email], (err, result) => {
        if (!err) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(500).json(err);
        }
    })
})


router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    let query = "delete from bill where id=?";
    db.query(query, [id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(400).json({ message: "همچین فاکتوری پیدا نشد." });
            }
            return res.status(200).json({ message: "فاکتور با موفقیت حذف شد." });
        } else {
            return res.status(500).json(err);
        }
    })
})
module.exports = router;



// SELECT TO_CHAR(created_at, 'YYYY-MM') , SUM(total) 
// FROM bill 
// WHERE created_at > created_at-30 
// GROUP BY created_at 
// ORDER BY created_at DESC