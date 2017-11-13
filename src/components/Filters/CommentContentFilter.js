import React, { Component } from 'react';
import Section from './Section';

class CommentContentFilter extends Component {
    render() {
        return (
	      	<Section active={ this.props.active } title='Descrição'>
		        <div className='input-field'>
		            <input id='filter-content-description' type='text' placeholder='Comentário ou Resposta' />
		        </div>
		    </Section>
        );
    }
}

export default CommentContentFilter;
