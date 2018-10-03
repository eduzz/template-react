import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { WithStyles } from 'decorators/withStyles';
import React, { ChangeEvent } from 'react';

import { PLACEHOLDERS } from '../../config';

interface IProps {
  classes?: any;
  onChange?: (value: string) => void;
}

@WithStyles(theme => ({
  root: {
    margin: '0 8px 0 8px',
    width: 150,
    height: 46
  },
}))
export default class Placeholders extends React.PureComponent<IProps> {
  handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    this.props.onChange(e.target.value);
  }

  render() {
    const { classes } = this.props;

    return (
      <FormControl className={classes.root}>
        <Select value='' onChange={this.handleChange} displayEmpty>
          <MenuItem value='' disabled>Máscaras</MenuItem>
          {PLACEHOLDERS.map(placeholder =>
            <MenuItem key={placeholder} value={`[${placeholder}]`}>{placeholder}</MenuItem>
          )}
        </Select>
      </FormControl>
    );
  }
}