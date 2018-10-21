import React from 'react';
import { Icon, Label, Menu, Table, Input} from 'semantic-ui-react';

const MovieListEntry = (props) => (


      <Table.Row>
        <Table.Cell>{props.movie.title}</Table.Cell>
        <Table.Cell textAlign='right'>  
			   <Label id={props.movie.title} onClick ={ () => props.handleClick(props.movie.haveWatched) }>
			    Unwatched
			  </Label>
  </Table.Cell>        
      </Table.Row>


)

export default MovieListEntry;

