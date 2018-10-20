import React from 'react';
import { Icon, Label, Menu, Table, Input} from 'semantic-ui-react';

const MovieListEntry = (props) => (


      <Table.Row>
        <Table.Cell>{props.movie.title}</Table.Cell>
      </Table.Row>


)

export default MovieListEntry;

