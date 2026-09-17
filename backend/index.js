require("dotenv").config();
console.log("EMAIL_PASS length:", process.env.EMAIL_PASS?.length);

const express = require("express");
const app = express();
const bodyParser=require('body-parser');
const cors=require('cors');
const AuthRouter=require('./Routes/AuthRouter');
const ProductRouter=require('./Routes/ProductRouter');

require("./Models/db");

const PORT = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});