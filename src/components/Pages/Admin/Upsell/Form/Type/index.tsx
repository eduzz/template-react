import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FieldRadio from '@react-form-fields/material-ui/components/Radio';
import FieldSelect from '@react-form-fields/material-ui/components/Select';
import FieldText from '@react-form-fields/material-ui/components/Text';
import Toast from 'components/Shared/Toast';
import React, { Fragment, PureComponent } from 'react';
import rxjsOperators from 'rxjs-operators';
import authService from 'services/auth';
import upsellService from 'services/upsell';

interface IProps {
  match?: any;

  model: { type?: number; content?: string; externalUrl?: string; };
  onChange: (value: IProps['model']) => void;
}

interface IState {
  currentType?: number;
  products: { value: string, label: string; }[];
  urlIsChecked: boolean;
  userId: number;
}

export default class Type extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      products: [],
      urlIsChecked: false,
      userId: 0,
    };
  }

  handleChange(model: IProps['model']) {
    this.props.onChange({ ...this.props.model, ...model });
  }

  handleChangeType = (type: number) => this.handleChange({ type, content: null });
  handleChangeContent = (content: any) => this.handleChange({ content: (content || '').toString() });
  handleChangeExternalUrl = (url: string) => this.handleChange({ externalUrl: (url || '').toString() });

  componentDidMount() {
    authService.getUser().subscribe(model => {
      this.setState({
        userId: model.id,
      });
    }, error => Toast.error(error));
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.model.type === this.state.currentType) return;

    if (!prevProps.model.type) {
      (this.state.products || []).length && this.setState({ products: [] });
      return;
    }

    this.setState({ currentType: prevProps.model.type, products: null });

    upsellService.getProducts(prevProps.model.type).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(products => {
      this.setState({
        products: products.map(p => ({ value: (p.hash || p.id).toString(), label: p.title }))
      });
    }, err => Toast.error(err));
  }

  handleCheck = (e: any) => {
    this.setState({
      urlIsChecked: e.target.checked,
    });
  }

  render() {
    const { model } = this.props;
    const { products } = this.state;

    return (
      <div>
        <Typography variant='subtitle1'>Qual produto vamos vender?</Typography>

        <Grid container alignItems='center' spacing={16}>
          <Grid item xs={false}>
            <FieldRadio
              value={1}
              checked={model.type === 1}
              label='Produto Eduzz'
              onChange={this.handleChangeType}
            />
          </Grid>

          <Grid item xs={false}>
            <FieldRadio
              value={2}
              checked={model.type === 2}
              label='Curso do Nutror'
              onChange={this.handleChangeType}
            />
          </Grid>

          <Grid item xs={true} sm={4}>
            <FieldSelect
              value={(model.content || '').toString()}
              margin='none'
              validation='required'
              onChange={this.handleChangeContent}
              options={products}
              loading={!products}
              disabled={!model.type}
            />
          </Grid>

          {model.type === 1 && (this.state.userId === 60385 || this.state.userId === 167490) &&
            <Fragment>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.urlIsChecked}
                      onClick={this.handleCheck}
                    />
                  }
                  label='Abrir uma URL Externa'
                />
              </Grid>

              {!!this.state.urlIsChecked &&
                <Grid item sm={true}>
                  <FormControl fullWidth>
                    <FieldText
                      value={model.externalUrl}
                      name='url'
                      variant='outlined'
                      onChange={this.handleChangeExternalUrl}
                      fullWidth
                      placeholder='http://www.nutror.com/'
                      validation='required'
                    />
                  </FormControl>
                </Grid>
              }
            </Fragment>
          }
        </Grid>

      </div>
    );
  }
}