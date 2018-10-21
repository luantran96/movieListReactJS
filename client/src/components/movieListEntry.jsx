import React from 'react';
import { Icon, Label, Menu, Table, Input} from 'semantic-ui-react';

const MovieListEntry = (props) => {

	const {haveWatched} = props.movie;
	let renderedDOM;

	if (haveWatched) {
		renderedDOM = <Label color='green' id={props.movie.title} onClick ={ (e) => props.handleClick(e.target, props.movie.haveWatched) }>Watched</Label>;	   
	} else {
		renderedDOM = <Label id={props.movie.title} onClick ={ (e) => props.handleClick(e.target, props.movie.haveWatched) }>To Watch</Label>;

	}

	return (

      <Table.Row>
        <Table.Cell>{props.movie.title}</Table.Cell>
        <Table.Cell textAlign='right'>  
			{renderedDOM}
  </Table.Cell>        
      </Table.Row>

		)


}

export default MovieListEntry;

