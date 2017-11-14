import React, { Component } from 'react';
import jquery from 'jquery';

class StudentsFrequencySelect extends Component 
{
    componentDidMount() {
        jquery('#students-select-frequency').material_select();
    }	
    render() 
    {
        return (
            <select id="students-select-frequency">
                <option value=''>Todos</option>
                <option value='1'>Nunca assistiram</option>
                <option value='2'>Assistiram uma ou mais aulas</option>
                <option value='3'>Concluíram o Curso</option>
                <option value='4'>Cancelaram o Curso</option>
            </select>
        );
    }
}

export default StudentsFrequencySelect;