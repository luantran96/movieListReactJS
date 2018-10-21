import _ from 'lodash'
import React from 'react';
import movies from './../../../data/data.js';
import MovieListEntry from './movieListEntry.jsx';
import { Icon, Label, Menu, Table, Input, Search, Form, Button,Header, Segment} from 'semantic-ui-react';
import $ from 'jquery';
import API_KEY from './../../../config.js';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			movies: [],
			curMovies:  [],	
			val: '',
			searchVal:'',
			searchResults:[]
		};

		console.log(this.state);

		this.createList = this.createList.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.addMovies = this.addMovies.bind(this);
		this.renderWatched = this.renderWatched.bind(this);
		this.renderToWatch = this.renderToWatch.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.searchMovies= this.searchMovies.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleResultSelect = this.handleResultSelect.bind(this);
		this.showInfo = this.showInfo.bind(this);
	}


	handleChange({value}, actionType) {
		this.setState({
			val: value
		});
	}

	handleSearch() {
		if(this.state.val === ' ') {
			this.setState({
				movies: this.state.movies
			});		
		}
		let updatedMovies = [];

		this.state.movies.forEach( (movie) => {
			if (movie.title.includes(this.state.val)) {
				updatedMovies.push(movie);
			}
		});

		this.setState({
			curMovies: updatedMovies
		});
	}

	addMovies() {
		let movie = this.state.val;
		let movies = this.state.movies;

		movies.push({
			title: movie,
			haveWatched: false
		});

		this.setState({
			movies: movies
		});
	}


	handleClick({id}, haveWatched) {
	let movies = this.state.movies;
	movies.map( (movie) => {
		if (movie.title === id) {
			movie.haveWatched = !movie.haveWatched;
		}
	});
	this.setState({
		curMovies: movies 
	})

	}

	searchMovies(query, cb) {

		$.ajax({
			method: 'GET',
			url: `https://api.themoviedb.org/3/search/movie`,
			data: {
			api_key: API_KEY,
			query: query
			}
		}).done( (res) => {

			let filteredResults = [];
			console.log('query:',query);
			

			for (let i = 0; i < 5; i++) {
			var {title,release_date, overview, poster_path} = res.results[i];

				filteredResults.push({
					title,
					release_date,
					overview,
					poster_path,
					haveWatched: false
				});

			}

			console.log(filteredResults);
			cb(filteredResults);
		});
	}

	renderWatched() {
		let movies = this.state.movies;
		let movieList = [];

		movies.forEach((movie) => {
			if (movie.haveWatched) {
				movieList.push(movie);
			}
		});

		this.setState({
			curMovies: movieList
		})
	}

	renderToWatch() {
		let movies = this.state.movies;
		let movieList = [];

		movies.forEach((movie) => {
			if (!movie.haveWatched) {
				movieList.push(movie);
			}
		});

		this.setState({
			curMovies: movieList
		})
	}

	showInfo(e, movie) {

		console.log(movie);

      return (

      <Table.Row>
        <Table.Cell>
        	<div>{movie.title}</div>
	        <div>{movie.overview}</div>
        </Table.Cell>      
      </Table.Row>

      	)
	}

	createList() {
	let list = [];
		this.state.curMovies.forEach((movie, idx) => {
			list.push(<MovieListEntry key={idx} movie={movie} showInfo = {this.showInfo} handleClick ={this.handleClick}/>);
		});
		return list;
	}

	handleResultSelect(e, { result }) {
		console.log(result);

		 let movies = this.state.movies;

		movies.push(result);
		console.log(movies);
		this.setState({
			movies: movies,
			curMovies: movies,
			searchResults: [],
			searchVal:''
		});
	}

	handleSearchChange(e, {value}) {
	this.setState({ isLoading: true, searchVal: value });
     
     if (value.length < 1) {
     	this.setState({searchResults: []});
     } else {
      this.searchMovies(value, (results) => {
	      this.setState({
	        isLoading: false,
	        searchResults: results
	      });
      });

     }

	}

	render() {
		return (
			<div>
		<title> Movie List</title>
		<h1> Movie List </h1>

<div id ='input'>	
	<div id='addMovies'>
	<Search 
	loading={this.state.isLoading}
	onResultSelect = {this.handleResultSelect}
	onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
	results = {this.state.searchResults}
	value = {this.state.searchVal}
	/>
	</div>

	<div id='search'>
	<Input id='searchBtn' placeholder='Search...' onChange= { (e) => this.handleChange(e.target) }/>
	<Button id='searchBtn' color='teal' onClick ={() => this.handleSearch()}>Search</Button>
	</div>
</div>

	<div id='table'>
	<Button color='green' id='watched' onClick ={() => this.renderWatched() }>Watched</Button>
	<Button id='toWatch' onClick ={() => this.renderToWatch() }>To Watch</Button>
  	<Table striped>
    <Table.Header>
      <Table.Row>	
        <Table.HeaderCell>Movie Title</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Row>
      </Table.Header>
    <Table.Body>
    	{this.createList()}
    </Table.Body>
    </Table>

    </div>

	</div>

		)	
	};

}

export default App;



