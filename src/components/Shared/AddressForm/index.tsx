import Grid from '@material-ui/core/Grid';
import FieldSelect from '@react-form-fields/material-ui/components/Select';
import FieldText from '@react-form-fields/material-ui/components/Text';
import textCounter from 'helpers/textCounter';
import IAddress from 'interfaces/models/address';
import ISelectItem from 'interfaces/selectItem';
import React, { Fragment, PureComponent } from 'react';
import * as Rx from 'rxjs';
import RxOp from 'rxjs-operators';
import addressService from 'services/address';

import Toast from '../Toast';

interface IState {
  states?: ISelectItem[];
  isFetching: boolean;
}

interface IProps {
  value: Partial<IAddress>;
  disabled?: boolean;
  onChange: (address: Partial<IAddress>) => void;
}

export default class AddressForm extends PureComponent<IProps, IState> {
  zipcode$: Rx.Subject<string>;

  constructor(props: IProps) {
    super(props);
    this.zipcode$ = new Rx.Subject();
    this.state = { isFetching: false };

    this.zipcode$.pipe(
      RxOp.logError(),
      RxOp.bindComponent(this),
      RxOp.filter(z => z.length >= 8),
      RxOp.debounceTime(500),
      RxOp.tap(() => this.setState({ isFetching: true })),
      RxOp.switchMap(zipcode => addressService.getAddressByZipcode(zipcode)),
    ).subscribe(address => {
      this.setState({ isFetching: false });
      this.props.onChange({ ...this.props.value, ...address });
    }, err => {
      this.setState({ isFetching: false });
      Toast.error(err);
    });
  }

  componentDidMount() {
    addressService.getStates().pipe(
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(states => {
      this.setState({ states });
    }, err => Toast.error(err));
  }

  onZipcodeChange = (value: string) => {
    this.onChange('zipcode')(value);
    this.zipcode$.next(value);
  }

  onChange = (key: keyof IAddress) => (value: any) => {
    this.props.onChange({
      ...this.props.value,
      [key]: value
    });
  }

  render() {
    const { isFetching, states } = this.state;
    let { value, disabled } = this.props;
    value = value || {};

    return (
      <Fragment>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={4}>
            <FieldText
              label='CEP'
              mask='zipcode'
              validation='required'
              value={value.zipcode}
              loading={isFetching}
              disabled={disabled}
              onChange={this.onZipcodeChange}
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <FieldText
              label='Rua'
              validation='required|max:300'
              value={value.street}
              disabled={isFetching || disabled}
              helperText={textCounter(value.street, 300)}
              onChange={this.onChange('street')}
            />
          </Grid>
        </Grid>

        <Grid container spacing={16}>
          <Grid item xs={12} sm={4}>
            <FieldText
              label='Número'
              validation='required|integer'
              value={value.number}
              disabled={isFetching || disabled}
              onChange={this.onChange('number')}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FieldText
              label='Complemento'
              validation='string|max:50'
              value={value.complement}
              helperText={textCounter(value.complement, 50)}
              disabled={isFetching || disabled}
              onChange={this.onChange('complement')}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FieldText
              label='Bairro'
              validation='required|max:150'
              value={value.neighborhood}
              helperText={textCounter(value.neighborhood, 150)}
              disabled={isFetching || disabled}
              onChange={this.onChange('neighborhood')}
            />
          </Grid>
        </Grid>

        <Grid container spacing={16}>
          <Grid item xs={12} sm={8}>
            <FieldText
              label='Cidade'
              validation='required|max:150'
              value={value.city}
              helperText={textCounter(value.city, 150)}
              disabled={isFetching || disabled}
              onChange={this.onChange('city')}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FieldSelect
              label='Estado'
              validation='required|max:2'
              value={value.state}
              disabled={isFetching || disabled}
              options={states}
              emptyOption='Selecione...'
              loading={!states}
              onChange={this.onChange('state')}
            />
          </Grid>
        </Grid>

      </Fragment>
    );
  }
}