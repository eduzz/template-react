import React from 'react';
import { Button } from '../components/Modal';

const InviteTable = () => (  
    <table className="striped responsive-table">
        <thead>
            <tr>
                <th>E-mail</th>
                <th>Data envio</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>usuario@email.com</td>
                <td>14/11/2017</td>
                <td>
                    <Button className='button small affirmative waves-effect waves-light' target='modal-convites'>
                        <span>Editar</span>
                    </Button>
                </td>
            </tr>
        </tbody>
    </table>  
);

export default InviteTable;


