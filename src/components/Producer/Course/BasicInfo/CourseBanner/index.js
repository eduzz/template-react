import React from 'react';
import ImageUploader from 'components/ImageUploader';
import { cdn } from 'constants/index';
import styles from './styles.css';

const CourseBanner = ({ customization }) => (
	<section className={styles.component}>
            <h3 className='form-section-title'>Informações Básicas</h3>
            <h3 className='form-block-title'>Banner Principal do Curso</h3>
            <p className="input-description">Esta é a imagem principal do Curso</p>
			<label className="input-label">Tamanho sugerido: 1920x400</label>
            <ImageUploader defaultImage={cdn + customization.image_cover} />
	</section>
);

export default CourseBanner;
