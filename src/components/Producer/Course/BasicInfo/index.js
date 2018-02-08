import React from 'react';
import TextArea from 'components/TextArea';
import CourseBanner from './CourseBanner';
import CategorySelect from './CategorySelect';
import AuthorSelect from './AuthorSelect';
import styles from './styles.css';

const CourseBasicInfo = ({ course, getLessons }) => (
    <div className={styles.component}>
        <div className="form-section">
            <div className='row'>
                <div className='col s12'>
                    <CourseBanner customization={course.customization || {}} />
                </div>
            </div>
        </div>
        <div className="form-section">
            <div className='row'>
                <div className='col xl7 s12'>
                    <div className='form-block'>
                        <h3 className='form-section-title'>Detalhes do Curso</h3>
                        <CategorySelect selected={course.category || {}} />

                        <TextArea
                            floatlabel='Descrição do Curso'
                            defaultValue={course.description}
                        />
                    </div>
                </div>
                <div className='col xl5 s12'>
                    <div className='form-block'>
                        <h3 className='form-section-title'>Autor do Curso</h3>
                        <AuthorSelect selected={course.author || {}} />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default CourseBasicInfo;
