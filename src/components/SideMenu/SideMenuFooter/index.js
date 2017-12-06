import React from 'react';
import Icon from 'components/Icon';

const SideMenuFooter = () => (
    <nav className="inside-nav">
        <ul>
            <li>
                <a href="">
                    <Icon name='exit' />
                    Sair
                </a>
            </li>
            <li>
                <a href="">
                    <Icon name='gears' />
                    Config
                </a>
            </li>
            <li>
                <a href="">
                    <Icon name='help' />
                    Ajuda
                </a>
            </li>
        </ul>
    </nav>
);

export default SideMenuFooter;
