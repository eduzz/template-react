import React, { Component } from 'react';
import jquery from 'jquery';

class UpsellContentSelect extends Component {
	
	componentDidMount() {
		jquery('select').material_select();
	}

	render() {
		return (
			<div className='input-field'>
                <select>
                    <option value=''>Escolha um Conteúdo</option>
                    <option value=''>Conteudo 1</option>
                    <option value=''>Conteúdo 2</option>
                    <option value=''>Conteúdo 3</option>
                    <option value=''>Conteúdo 4</option>
                </select>
                <label>Conteúdo na Eduzz</label>
            </div>
		);
	}
}

export default UpsellContentSelect;