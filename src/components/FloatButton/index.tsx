import React from 'react';
// import Icon from 'components/Icon';

const styles = require('./styles.css');

const floatButton = (props: any) => (
  <div>
    <input type='submit' value='Salvar' className={styles.component} />
    {/* <a htmlFor='floatButtonSubmit' className={styles.component} {...props}>
            <Icon name='disk-save' />
        </a> */}
  </div>
);

export default floatButton;
