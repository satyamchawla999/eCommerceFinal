const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = process.env.PORT;

const db = require("./Config/mongoose");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/Products', express.static(__dirname + '/Products'));
app.use('/Users', express.static(__dirname + '/Users'));


app.use('/', require('./Routes'));

app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
})