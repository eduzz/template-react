import React from 'react';
import Icon from '../Icon';

const Footer = () => (
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
                    <Icon name='config' />
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

export default Footer;
