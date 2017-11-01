import React from 'react';
import Icon from './Icon';

const SideMenuFooter = () => (
    <nav className="inside-nav">
        <ul>
            <li>
                <a href="">
                    <Icon name='paper' />
                    Sair
                </a>
            </li>
            <li>
                <a href="">
                    <Icon name='paper' />
                    Config
                </a>
            </li>
            <li>
                <a href="">
                    <Icon name='paper' />
                    Ajuda
                </a>
            </li>
        </ul>
    </nav>
);

export default SideMenuFooter;
