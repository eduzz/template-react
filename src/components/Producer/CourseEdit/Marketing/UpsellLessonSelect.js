import React, { Component } from 'react';
import jquery from 'jquery';

class UpsellLessonSelect extends Component {
	
	componentDidMount() {
		jquery('select').material_select();
	}

	render() {
		return (
			<div className='input-field'>
                <select>
                    <option value=''>Escolha uma Aula </option>
                    <option value=''>Aula 1</option>
                    <option value=''>Aula 2</option>
                    <option value=''>Aula 3</option>
                    <option value=''>Aula 4</option>
                </select>
                <label>Aula</label>
            </div>
		);
	}
}

export default UpsellLessonSelect;