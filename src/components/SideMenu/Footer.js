import React from 'react';
import Icon from '../Icon';

const Footer = () => (
    <nav className="inside-nav">
        <ul>
            <li>
                <a href="">
                    <Icon name='package' />
                    Sair
                </a>
            </li>
            <li>
                <a href="">
                    <Icon name='package' />
                    Config
                </a>
            </li>
            <li>
                <a href="">
                    <Icon name='package' />
                    Ajuda
                </a>
            </li>
        </ul>
    </nav>
);

export default Footer;
