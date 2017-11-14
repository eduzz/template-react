import React, { Component } from 'react';
import AuthorsTable from './AuthorsTable';
import AuthorEdit from './AuthorEdit';

class Author extends Component{
  constructor(){
    super();
     this.state = {Id:'', Name:'', Description:''}; 
  }

  render(){
    return (
    <div className="container">

        <AuthorEdit 
          Id={this.state.Id}
          Name={this.state.Name} 
          Description={this.state.Description} />

        <AuthorsTable onClick={ data => 
          this.setState({
            Name: data.Name, /* #dev Alterar pro nome amigavel */
            Description: data.Description, /* #dev Alterar pro nome amigavel */
            Id : data.Id /* #dev Alterar pro nome amigavel */
          })
        } />
        
    </div>
    )
  }
}

export default Author;