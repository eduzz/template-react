import React from 'react';
import styles from './styles.css';
import Icon from 'components/Icon';

const FloatButton = ({ data = [] }) => (
         <a className={styles.component}>
            <Icon name='disk-save' />
         </a>

    );

export default FloatButton;