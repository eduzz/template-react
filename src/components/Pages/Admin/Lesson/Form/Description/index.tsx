import React, { PureComponent, Fragment } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IForm } from '../';
import { WithStyles } from 'decorators/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

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
  handleChange = (type: 'Descricao' | 'Iframe') =>
    () => {
      this.props.form.updateModel((model, v) => model.description_type = type)();
    }

  render() {
    const { classes, form } = this.props;

    return (
      <Fragment>
        <FormControlLabel
          control={
            <Radio
              checked={form.model.description_type === 'Descricao'}
              onClick={this.handleChange('Descricao')}
              value='Descricao'
            />
          }
          label='Descrição'
        />
        <FormControlLabel
          control={
            <Radio
              checked={form.model.description_type === 'Iframe'}
              onClick={this.handleChange('Iframe')}
              value='Iframe'
            />
          }
          label='IFrame'
        />

        <div className={classes.ckeditor}>
          <CKEditor
            editor={ClassicEditor}
            data={form.model.description}
            onChange={this.handleChange}
          />
        </div>
      </Fragment>
    );
  }
}