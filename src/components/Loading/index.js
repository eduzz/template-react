import React from 'react';
import styles from './styles.css';

const Loading = ({ data = [] }) => {

    if(!data.length) {
        return (
            <div className={styles.component}>
                <div className='loading-wrapper'>
                    <div>
                        <svg className='loading-icon' id='Layer_1' xmlns='http://www.w3.org/2000/svg' x={'0px'} y={'0px'} viewBox='0 0 50 50' style={{enableBackground: 'new 0 0 50 50'}}>
                            <path className='a1' d='M8.5 41V8l22.7 22.8V8.5'/>
                            <path className='a2' d='M12.5 42V18l23.3 23.2V8.5'/>
                        </svg>
                        <p> Carregando... </p>
                    </div>
                </div>
            </div>
        );
    }

    return <span></span>;
};

export default Loading;
