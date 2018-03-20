import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CategorySelect from './CategorySelect';
import AuthorSelect from 'components/Producer/AuthorSelect';
import ImageUploader from 'components/ImageUploader';
import { cdn } from 'constants/index';
import { changeCourseField, receiveCourseImageCover, cleanCourseImageCover } from 'actionCreators/course';
import { uploadImage } from 'actionCreators/upload';
import TextField from 'material-ui/TextField';

const styles = require('./styles.css');

interface IProps {
  course: any;
  changeCourseField: any;
  courseID: number | string;
  uploadImage: any;
  receiveCourseImageCover: any;
  cleanCourseImageCover: any;
}

class CourseBasicInfo extends Component<IProps> {
  render() {
    const imageCover =
      this.props.course.customizations &&
      this.props.course.customizations.image_cover &&
      (this.props.course.customizations.image_cover.includes('http')
        ? this.props.course.customizations.image_cover
        : cdn + this.props.course.customizations.image_cover);

    return (
      <div className={styles.component}>
        <div className='form-section'>
          <div className='row'>
            <div className='col s12'>
              <section>
                <h3 className='form-section-title'>Informações Básicas</h3>
                <h3 className='form-block-title'>Banner Principal do Curso</h3>
                <p className='input-description'>
                  Esta é a imagem principal do Curso
                </p>
                <label className='input-label'>
                  Tamanho sugerido: 1920x400
                </label>

                <ImageUploader
                  value={imageCover}
                  onChange={(cover: any) => {
                    this.props.cleanCourseImageCover();
                    this.props.uploadImage(cover).then(
                      (res: any) => this.props.receiveCourseImageCover(res.data.data.url),
                    );
                  }}
                  large={true}
                  icon='paper'
                  text='Alterar Plano de fundo'
                />
              </section>
            </div>
          </div>
        </div>
        <div className='form-section'>
          <div className='row'>
            <div className='col xl7 s12'>
              <div className='form-block'>
                <h3 className='form-section-title'>Detalhes do Curso</h3>
                <CategorySelect
                  value={this.props.course.category.id}
                  onChange={(value: number) =>
                    this.props.changeCourseField('category', {
                      id: value,
                      name: this.props.course.category.name,
                    })
                  }
                />

                <TextField
                  label='Descrição do Curso'
                  value={this.props.course.description}
                  onChange={(e: any) =>
                    this.props.changeCourseField('description', e.target.value)
                  }
                  multiline
                  fullWidth
                />
              </div>
            </div>
            <div className='col xl5 s12'>
              <div className='form-block'>
                <h3 className='form-section-title'>Autor do Curso</h3>
                <AuthorSelect
                  value={this.props.course.author.id}
                  onChange={(value: number) =>
                    this.props.changeCourseField('author', {
                      id: value,
                      name: this.props.course.author.name,
                      avatar: this.props.course.author.avatar
                    })
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

const mapStateToProps = (state: any) => ({
  course: state.course || {}
});

const mapDispatchToProps = (dispatch: any) => ({
  uploadImage,
  ...bindActionCreators({ changeCourseField, receiveCourseImageCover, cleanCourseImageCover }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseBasicInfo);