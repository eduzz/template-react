import React from 'react';
import styles from './styles.css';
// import Icon from 'components/Icon';

const FloatButton = props => (
  <div>
    <input type="submit" value="Salvar" className={styles.component} />
    {/* <a htmlFor='floatButtonSubmit' className={styles.component} {...props}>
            <Icon name='disk-save' />
        </a> */}
  </div>
);

export default FloatButton;
