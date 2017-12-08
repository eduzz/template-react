import React from 'react';
import styles from './styles.css';
const Welcome = ({ data }) => (
    <div className={styles.component}>
        <div className="user-photo"><img src="http://static1.purepeople.com.br/articles/2/18/48/42/@/2157162-ashton-kutcher-criou-um-abaixo-assinado-237x237-2.jpg" alt=""/></div>
        <div className="user-data">
            <span className="message">Bem vindo</span>
            <h3 className="name">Brent Davis</h3>
        </div>
    </div>
);

export default Welcome;
