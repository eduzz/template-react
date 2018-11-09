import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FieldRadio from '@react-form-fields/material-ui/components/Radio';
import FieldSelect from '@react-form-fields/material-ui/components/Select';
import Toast from 'components/Shared/Toast';
import React, { PureComponent } from 'react';
import rxjsOperators from 'rxjs-operators';
import upsellService from 'services/upsell';

interface IProps {
  match?: any;

  model: { type?: number; content?: string; };
  onChange: (value: IProps['model']) => void;
}

interface IState {
  currentType?: number;
  products: { value: string, label: string; }[];
}

export default class Type extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { products: [] };
  }

  handleChange(model: IProps['model']) {
    this.props.onChange({ ...this.props.model, ...model });
  }

  handleChangeType = (type: number) => this.handleChange({ type, content: null });
  handleChangeContent = (content: any) => this.handleChange({ content: (content || '').toString() });

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

  render() {
    const { model } = this.props;
    const { products } = this.state;

    return (
      <div>
        <Typography variant='subtitle1'>Qual produto deseja vincular?</Typography>

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

          <Grid item xs={true} sm={6}>
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
        </Grid>

      </div>
    );
  }
}