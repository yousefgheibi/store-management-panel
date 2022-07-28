const express = require('express');
const connection = require('../db');
const router = express.Router();
let ejs = require('ejs');
let pdf = require('html-pdf');
let path = require('path');
var fs = require('fs');
var uuid = require('uuid');

router.post('/generateReport', (req, res) => {
    const generatedUuid = uuid.v4();
    const orderDetails = req.body;
    var productDetailsReport = JSON.parse(orderDetails.productDetails);

    let query = "insert into bill (name,uuid,typeFactor,paymentMethod,total,productDetails,description,user_email) values(?,?,?,?,?,?,?,?)";
    connection.query(query, [orderDetails.name, generatedUuid, orderDetails.typeFactor, orderDetails.paymentMethod, orderDetails.total, orderDetails.productDetails, orderDetails.description, orderDetails.email], (err, result) => {
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
    connection.query(query, [email], (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })
})




router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    let query = "delete from bill where id=?";
    connection.query(query, [id], (err, result) => {
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