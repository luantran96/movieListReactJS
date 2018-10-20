const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;




app.use(bodyParser.json());

console.log(__dirname + '/../public/dist');

app.use(express.static(__dirname + './../public/dist'));


app.listen(port, (req,res) => console.log(`Listening on port ${port}`))