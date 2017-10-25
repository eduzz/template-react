import React from 'react';
import eduzinho from '../assets/img/eduzinho.png';
import logoMiniEduzz from '../assets/img/logo_mini_eduzz.svg';

const Footer = () => (
	<footer className="page-footer">
		<span>Tecnologia desenvolvida pela</span>
		<img src={ logoMiniEduzz } alt="Eduzz" className="logo-footer" />
		<img src={ eduzinho } alt="Eduzz" className="avatar" />
	</footer>
);

export default Footer;