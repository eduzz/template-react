import React from 'react';
import { connect } from 'react-redux';
import TextArea from 'components/TextArea';
import CategorySelect from './CategorySelect';
import AuthorSelect from 'components/Producer/AuthorSelect';
import ImageUploader from 'components/ImageUploader';
import styles from './styles.css';
import { cdn } from 'constants/index';
import actionCreators from 'actionCreators';

class CourseBasicInfo extends React.Component {
  render() {
    const imageCover =
      this.props.course.customizations &&
      this.props.course.customizations.image_cover &&
      (this.props.course.customizations.image_cover.includes('http')
        ? this.props.course.image_cover
        : cdn + this.props.course.customizations.image_cover);

    return (
      <div className={styles.component}>
        <div className="form-section">
          <div className="row">
            <div className="col s12">
              <section>
                <h3 className="form-section-title">Informações Básicas</h3>
                <h3 className="form-block-title">Banner Principal do Curso</h3>
                <p className="input-description">
                  Esta é a imagem principal do Curso
                </p>
                <label className="input-label">
                  Tamanho sugerido: 1920x400
                </label>

                <ImageUploader
                  defaultImage={imageCover}
                  onChange={cover =>
                    this.props.changeCourseField('image_cover', cover)
                  }
                  large={true}
                  icon="paper"
                  text="Alterar Plano de fundo"
                />
              </section>
            </div>
          </div>
        </div>
        <div className="form-section">
          <div className="row">
            <div className="col xl7 s12">
              <div className="form-block">
                <h3 className="form-section-title">Detalhes do Curso</h3>
                <CategorySelect
                  value={this.props.course.id_category}
                  onChange={(event, index, value) =>
                    this.props.changeCourseField('id_category', value)
                  }
                />

                <TextArea
                  floatlabel="Descrição do Curso"
                  async={this.props.courseID && this.props.courseID !== 'new'}
                  defaultValue={this.props.course.description}
                  onChange={e =>
                    this.props.changeCourseField('description', e.target.value)
                  }
                />
              </div>
            </div>
            <div className="col xl5 s12">
              <div className="form-block">
                <h3 className="form-section-title">Autor do Curso</h3>
                <AuthorSelect
                  value={this.props.course.id_author}
                  onChange={(event, index, value) =>
                    this.props.changeCourseField('id_author', value)
                  }
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
  course: state.course || {}
});

const mapDispatchToProps = dispatch => ({
  changeCourseField(field, value) {
    dispatch(actionCreators.changeCourseField(field, value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseBasicInfo);
