import React, { Component } from 'react';
import jquery from 'jquery';

class CourseCategorySelect extends Component {
	
	componentDidMount() {
		jquery('select').material_select();
	}

	render() {
		return (
			<div className='input-field'>
				<select>
					<option value=''>Escolha uma categoria</option>
					<option value='1'>Arte e Entretenimento</option>
					<option value='2'>Comercio</option>
					<option value='3'>Tecnologia</option>
				</select>
				<label>Categoria</label>
			</div>
		);
	}
}

export default CourseCategorySelect;