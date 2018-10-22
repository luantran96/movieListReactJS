const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
const request = require('request');
const API_KEY = 'b84a53ed44730823f4fd1f874c80b175';
const db = require('./../database/index');


app.use(bodyParser.json());

console.log(__dirname + '/../public/dist');

app.use(express.static(__dirname + './../public/dist'));


app.post('/movies', (req, res) => {


	console.log(req.body.result);
	db.addMovie(req.body.result, () => {
		res.end();
	});
	
});

app.get('/movies', (req, res) => {

	console.log('IN GET /movies');
	db.fetchAllMovies((movies) => {
		res.json(movies);
	});

});


app.get('/reset', (req, res) => {

	db.reset(() =>{
		res.end();		
	});
});


app.listen(port, (req,res) => console.log(`Listening on port ${port}`))