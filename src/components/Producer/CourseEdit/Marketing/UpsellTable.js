import React from 'react';
import { Button } from '../components/Modal';

const UpsellTable = () => (  
    <table className="striped responsive-table">
        <thead>
            <tr>
                <th>Título</th>
                <th>Url</th>
                <th> </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Título do Upsell</td>
                <td>Link do Upsell</td>
                <td>
                    <Button className='button small affirmative waves-effect waves-light' target='upsell-modal'>
                        <span>Editar</span>
                    </Button>
                </td>
            </tr>
        </tbody>
    </table>  
);

export default UpsellTable;