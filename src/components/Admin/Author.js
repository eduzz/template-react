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
        <AuthorEdit />
        <AuthorsTable />
    </div>
    )
  }
}

export default Author;