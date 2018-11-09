import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import { FieldText } from '@react-form-fields/material-ui';
import { FormValidation } from '@react-form-fields/material-ui/components/FormValidation';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import { WithStyles } from 'decorators/withStyles';
import { IBanner } from 'interfaces/models/banner';
import React from 'react';
import rxjsOperators from 'rxjs-operators';
import bannerService from 'services/banner';

import ImageUploader from './ImageUploader';

export interface IForm {
  model: IBanner;
  updateModel: (handler: (model: IBanner, value: any) => void) => any;
}

interface IProps {
  classes?: any;
}

interface IState extends IStateForm<IBanner> {
  open: boolean;
  bannerId: number;
  isValid: boolean;
}

@WithStyles({
  titleLabel: {
    marginBottom: 8,
  },
  content: {
    display: 'flex',
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  optionControl: {
    marginRight: 16,
  },
  divider: {
    margin: '32px 0 24px 0',
  },
  textField: {
    marginBottom: 16,
  },
  imageUploadArea: {
    display: 'flex',
  },
  highlightImageContainer: {
    paddingTop: 8,
    marginRight: 16,
  },
})
export default class BannerDialog extends FormComponent<IProps, IState> {
  private initialModel: IBanner = {
    id: 0,
    img: '',
    sequence: 0,
    url: '',
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      open: false,
      bannerId: null,
      isValid: true,
      model: {
        ...this.initialModel,
      },
    };
  }

  componentDidMount() {
    bannerService.getBannerInfo().pipe(
      rxjsOperators.bindComponent(this),
      rxjsOperators.logError(),
    ).subscribe((banner = this.initialModel as IBanner) => {
      this.setState({
        open: true,
        model: {
          ...banner,
        },
      });
    });
  }

  private handleClose = () => {
    this.setState({
      open: false,
      bannerId: null,
    });

    this.resetForm();
  }

  getValidStatus = () => {
    const { model } = this.state;
    const status = Boolean(model.img);

    this.setState({
      isValid: status,
    });

    return status;
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (!this.getValidStatus()) return;

    this.handleClose();
  }

  handleChange = (state: any) => {
    this.setState(state);
  }

  render() {
    const { classes } = this.props;
    const { model, isValid } = this.state;

    return (
      <FormValidation onSubmit={this.handleSubmit}>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          fullWidth
        >
          <DialogTitle> Configurações do Anúncio </DialogTitle>
          <DialogContent>
            <Grid container className={`${classes.section} ${classes.imageUploadArea}`}>
              <Grid item xs={12} md={4}>
                <label className={classes.imageLabel}>Selecione a Imagem</label>
                <div className={classes.highlightImageContainer}>
                  <ImageUploader
                    width={250}
                    height={250}
                    label='img'
                    onChange={this.handleChange}
                    image={model.img}
                    error={!isValid}
                  />
                </div>
              </Grid>

              <Grid item xs={12} md={8}>
                <FieldText
                  value={model.url}
                  className={classes.textField}
                  name='url'
                  label='URL do Anúncio'
                  validation='required|url|max:250'
                  helperText='Ex.: http://google.com'
                  onChange={this.updateModel((model, v) => model.url = v)}
                  margin='dense'
                  placeholder='URL do Anúncio'
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>Cancelar</Button>
            <Button type='submit' color='primary'>Salvar</Button>
          </DialogActions>
        </Dialog>
      </FormValidation>
    );
  }
}

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}