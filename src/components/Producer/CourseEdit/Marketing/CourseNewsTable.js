import React from 'react';
import { Button } from '../components/Modal';

const CourseNewsTable = () => (  
    <table className="striped responsive-table">
        <thead>
            <tr>
                <th>Título</th>
                <th>Publicado</th>
                <th>Data</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Título da novidade</td>
                <td>status da novidade</td>
                <td>Data</td>
                <td>
                    <Button className='button small affirmative waves-effect waves-light' target='modal-novidades'>
                        <span>Editar</span>
                    </Button>
                    
                    <Button className='button small affirmative waves-effect waves-light'>
                        <span>Excluir</span>
                    </Button>                
                </td>
            </tr>
        </tbody>
    </table>  
);

export default CourseNewsTable;