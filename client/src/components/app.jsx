import React from 'react';
import movies from './../../../data/data.js';
import MovieListEntry from './movieListEntry.jsx';
import { Icon, Label, Menu, Table, Input, Search, Form, Button} from 'semantic-ui-react';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			movies: movies,
			curMovies:  movies,	
			val: ''
		};

		this.createList = this.createList.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);

	}


	handleChange({value}, actionType) {

		this.setState({
			val: value
		});

		console.log(this.state.val);
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


	createList() {

	var list = [];

		this.state.curMovies.forEach((movie) => {
			list.push(<MovieListEntry movie={movie} /> );
		});
		return list;
	}

	render() {
		return (
			<div>
		<title> Movie List</title>
		<h1> Movie List </h1>

<div id ='input'>	

	<div id='addMovies'>
	<Input id='searchBtn' placeholder='Add Movie...' onChange= { (e) => this.handleChange(e.target) }/>
	<Button id='addBtn' >Add</Button>
	</div>

	<div id='search'>
	<Input id='searchBtn' placeholder='Search...' onChange= { (e) => this.handleChange(e.target) }/>
	<Button id='searchBtn' onClick ={() => this.handleSearch()}>Search</Button>

	</div>

</div>

	<div id='table'>
  	<Table celled padded>
    <Table.Header>
      <Table.Row>	
        <Table.HeaderCell>Movie Title</Table.HeaderCell>
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



