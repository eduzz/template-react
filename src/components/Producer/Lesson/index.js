import React from 'react';
import styles from './styles.css';

class Lesson extends React.Component {
    constructor() {
        super();

        this.lessonID = null;
    }

    render() {
        this.lessonID = this.props.match.params.lessonID;

        return (
            <section>
                <h1>Lesson Page</h1>
            </section>
        );
    }
}

export default Lesson;
