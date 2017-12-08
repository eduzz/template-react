import React from 'react';
import Icon from 'components/Icon';
import styles from './styles.css';

const CourseBanner = () => (
	<section className={styles.component}>
		<div className="input-img large-banner">
			<div className="container">
				<a className="button small soft top-right">
					<Icon name='paper' />
					<span>Alterar Plano de fundo</span>
				</a>
			</div>
		</div>
	</section>
);

export default CourseBanner;
