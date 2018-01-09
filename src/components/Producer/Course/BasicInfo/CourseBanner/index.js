import React from 'react';
import Icon from 'components/Icon';
import styles from './styles.css';

const CourseBanner = () => (
	<section className={styles.component}>
            <h3 className='form-section-title'>Informações Básicas</h3>
            <h3 className='form-block-title'>Banner Principal do Curso</h3>
            <p className="input-description">Está é a imagem principal do Curso</p>
			<label className="input-label">Tamanho sugerido: 1920x400</label>
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
