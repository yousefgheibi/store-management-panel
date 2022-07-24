require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const peopleRoute = require("./routes/people");
const productRoute = require("./routes/product");
const userRoute = require("./routes/user");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRoute);
app.use('/people', peopleRoute);
app.use('/product', productRoute);

app.listen(process.env.PORT, () => {
    console.log("server is running");
});