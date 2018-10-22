import React from 'react';
import { Icon, Label, Menu, Table, Input} from 'semantic-ui-react';

const MovieListEntry = (props) => {

	const {haveWatched,showInfo} = props.movie;
	let renderedDOM;
	let showInfoDOM = <Table.Row></Table.Row>;

	console.log('showInfo: ',showInfo);

	if (haveWatched) {
		renderedDOM = <Label color='green' id={props.movie.title} onClick ={ (e) => props.handleClick(e.target, props.movie.haveWatched)}>Watched</Label>;	   
	} else {
		renderedDOM = <Label id={props.movie.title} onClick ={ (e) => props.handleClick(e.target, props.movie.haveWatched)}>To Watch</Label>;
	}

	if (!showInfo) {
		showInfoDOM = <Table.Row onClick={ (e) => props.showInfo(e.target, props.movie)}>
        <Table.Cell>{props.movie.title}</Table.Cell>
        <Table.Cell textAlign='right'>  
			{renderedDOM}
  </Table.Cell>        
      </Table.Row>;

	} else {
		showInfoDOM = <Table.Row onClick={ (e) => props.showInfo(e.target, props.movie)}>
        <Table.Cell>
        {renderedDOM}
        <div id ='movieTitle'>{props.movie.title}</div>
        <div id='description'><span className='key'>Description:</span> {props.movie.description} <br/></div>
        <div id='description'><span className='key'>Release Date:</span> {props.movie.release_date}<br/></div>
        </Table.Cell>  

        <Table.Cell>
        <img src={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`} height="300" width="300"/>     
        </Table.Cell>
      </Table.Row>
	}


	return (
		showInfoDOM
		)


}

export default MovieListEntry;

