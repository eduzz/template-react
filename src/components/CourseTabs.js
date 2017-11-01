import React from 'react';
import Icon from './Icon';

const CourseTabs = () => (
	<div className='tabs'>
		<a className='tab-button waves-effect waves-light'>
			<Icon name='paper' />
			Informações Básicas
		</a>
		<a className='tab-button waves-effect waves-light'>
			<Icon name='paper' />
			Configurações Avançadas
		</a>
		<a className='tab-button waves-effect waves-light'>
			<Icon name='paper' />
			Personalizações
		</a>
		<a className='tab-button waves-effect waves-light'>
			<Icon name='paper' />
			Upsells
		</a>
		<a className='tab-button waves-effect waves-light'>
			<Icon name='paper' />
			Avaliações
		</a>
	</div>
);

export default CourseTabs;