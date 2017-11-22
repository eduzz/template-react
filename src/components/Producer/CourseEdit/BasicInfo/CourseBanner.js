import React from 'react';
import Icon from 'components/Icon';

const CourseBanner = () => (
	<section>
		<div className="input-img large-banner">
			<div className="container">
				<a className="button small soft top-right">
					<Icon name='paper' />
					<span>Alterar Plano de fundo</span>
				</a>
				<a className="input-img course-logo">
					<Icon name='paper' />
					<span>Alterar Logo</span>
				</a>
			</div>
		</div>
	</section>
);

export default CourseBanner;
