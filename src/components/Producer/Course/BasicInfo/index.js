import React from 'react';
import { connect } from 'react-redux';
import TextArea from 'components/TextArea';
import CategorySelect from './CategorySelect';
import AuthorSelect from './AuthorSelect';
import ImageUploader from 'components/ImageUploader';
import styles from './styles.css';
import { cdn } from 'constants/index';
import actions from 'actions';

class CourseBasicInfo extends React.Component {
    componentDidMount() {
        if(this.props.courseID && this.props.courseID !== 'new') {
            this.props.getCourseCustomization(this.props.courseID);
        }
    }

    render() {
        const imageCover = this.props.course.image_cover && (cdn.includes('http') ? this.props.course.image_cover : cdn + this.props.course.image_cover);

        return (
            <div className={styles.component}>
                <div className="form-section">
                    <div className='row'>
                        <div className='col s12'>
                            <section>
                                <h3 className='form-section-title'>Informações Básicas</h3>
                                <h3 className='form-block-title'>Banner Principal do Curso</h3>
                                <p className="input-description">Esta é a imagem principal do Curso</p>
                    			<label className="input-label">Tamanho sugerido: 1920x400</label>

                                <ImageUploader
                                    defaultImage={imageCover}
                                    onChange={this.props.changeCourseCover}
                                />
                        	</section>
                        </div>
                    </div>
                </div>
                <div className="form-section">
                    <div className='row'>
                        <div className='col xl7 s12'>
                            <div className='form-block'>
                                <h3 className='form-section-title'>Detalhes do Curso</h3>
                                <CategorySelect
                                    value={this.props.course.id_category}
                                    onChange={(event, index, value) => this.props.changeCourseCategory(value)}
                                />

                                <TextArea
                                    floatlabel='Descrição do Curso'
                                    async={this.props.courseID && this.props.courseID !== 'new'}
                                    defaultValue={this.props.course.description}
                                    onChange={e => this.props.changeCourseDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='col xl5 s12'>
                            <div className='form-block'>
                                <h3 className='form-section-title'>Autor do Curso</h3>
                                <AuthorSelect
                                    value={this.props.course.id_author}
                                    onChange={(event, index, value) => this.props.changeCourseAuthor(value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    course: state.course || {},
});

const mapDispatchToProps = dispatch => ({
    getCourseCustomization(courseID) {
        dispatch(actions.getCourseCustomization(courseID));
    },
    changeCourseCover(cover) {
        dispatch(actions.changeCourseCover(cover));
    },
    changeCourseDescription(value) {
        dispatch(actions.changeCourseDescription(value));
    },
    changeCourseCategory(categoryID) {
        dispatch(actions.changeCourseCategory(categoryID));
    },
    changeCourseAuthor(authorID) {
        dispatch(actions.changeCourseAuthor(authorID));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseBasicInfo);
