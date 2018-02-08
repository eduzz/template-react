import React from 'react';
import styles from './styles.css';
import Icon from 'components/Icon';

const FloatButton = (props) => (
     <a className={styles.component} {...props}>
        <Icon name='disk-save' />
     </a>
);

export default FloatButton;
