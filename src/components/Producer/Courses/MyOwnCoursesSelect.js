import React, { Component } from 'react';
import jquery from 'jquery';

class MyOwnCoursesSelect extends Component {
    componentDidMount() {
        jquery('#MyOwnCoursesSelect').material_select();

        // #dev Alimentar o SELECT com estes dados: ((PRESTA ATENÇÃO)) Não é os cursos que o cara é matriculado, é os CURSOS que ele CRIOU, OU, que ele tem PERMISSÃO ADMIN. 
    }

    render() {
        return (
    	    <select id="MyOwnCoursesSelect">
                <option value=''>Todos</option>
                <option value='1'>Curso 1</option>
                <option value='2'>Curso 2</option>
                <option value='3'>Curso 3</option>
            </select>
        );
    }
}

export default MyOwnCoursesSelect;
