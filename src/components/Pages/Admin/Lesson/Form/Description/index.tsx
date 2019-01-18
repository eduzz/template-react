import React, { PureComponent, Fragment } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IForm } from '../';
import { WithStyles } from 'decorators/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FieldText from '@react-form-fields/material-ui/components/Text';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

interface IProps {
  form: IForm;
  classes?: any;
}

@WithStyles({
  ckeditor: {
    marginTop: 8,
  },
  iframeConfigField: {
    width: 100,
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

        {form.model.description_type === 'Descricao' &&
          <div className={classes.ckeditor}>
            <CKEditor
              editor={ClassicEditor}
              data={form.model.description}
              onChange={this.handleChange}
            />
          </div>
        }
        {form.model.description_type === 'Iframe' &&
          <Grid container spacing={16} className={classes.iframe}>
            <Grid item xs={12} md={8}>
              <Typography variant='subtitle2' color='inherit' noWrap>Link do Iframe</Typography>
              <FieldText
                value={form.model.iframe_url}
                className={classes.iframeUrlField}
                name='iframe_url'
                helperText='* necessário uso do https'
                onChange={form.updateModel((model, v) => model.iframe_url = v)}
                fullWidth
                margin='dense'
                placeholder='https://www.exemplo.com.br'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item>
              <Typography variant='subtitle2' color='inherit' noWrap>Altura do Iframe (px)</Typography>
              <FieldText
                value={form.model.iframe_config}
                className={classes.iframeConfigField}
                type='number'
                name='iframe_config'
                onChange={form.updateModel((model, v) => model.iframe_config = v)}
                margin='dense'
                placeholder='Ex.: 250'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        }
      </Fragment>
    );
  }
}