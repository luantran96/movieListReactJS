const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movieList');

var db = mongoose.connection;


var movieListSchema = new mongoose.Schema({
	title: String,
	description: String,
	haveWatched: Boolean,
	poster_path: String,
	release_date: String,
	showInfo: Boolean
});


var movieList = mongoose.model('movieList', movieListSchema);


var addMovie = (movie, cb) => {

	const {title, description, haveWatched, poster_path, release_date, showInfo} = movie;

	console.log('title: ', title);

	movieList.findOne({title})
	.then((err, movies) => {
		if (!movies) {
			movieList.create({title, description, haveWatched, poster_path, release_date, showInfo})
			.then ( () => {
				cb();
			});
		}
	});
};


var reset = (cb) => {


	movieList.deleteMany({})
	.then (() => {

		cb();
	});
}


var fetchAllMovies = (cb) => {

	movieList.find({})
	.then ( (movies) => {
		console.log(movies);
		cb(movies);
	});
};



module.exports.addMovie = addMovie;
module.exports.fetchAllMovies = fetchAllMovies;
module.exports.reset = reset;


