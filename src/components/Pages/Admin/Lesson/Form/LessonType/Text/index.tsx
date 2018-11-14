import React, { PureComponent, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IForm } from '../..';
import { WithStyles } from 'decorators/withStyles';

interface IProps {
  form: IForm;
  classes?: any;
}

@WithStyles({
  ckeditor: {
    marginTop: 8,
  },
})
export default class Text extends PureComponent<IProps> {
  handleChange = (event: any, editor: any) => {
    const data = editor.getData();

    this.props.form.updateModel((model, v) => model.content[model.lesson_type.id] = data)();
  }

  render() {
    const { classes, form } = this.props;
    const content = form.model.content[form.model.lesson_type.id];

    return (
      <Fragment>
        <Typography variant='subtitle2' color='inherit' noWrap>Texto</Typography>
        <CKEditor
          className={classes.ckeditor}
          editor={ClassicEditor}
          data={content}
          onChange={this.handleChange}
        />
      </Fragment>
    );
  }
}