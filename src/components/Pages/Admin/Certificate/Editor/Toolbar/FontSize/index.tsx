import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { WithStyles } from 'decorators/withStyles';

interface IProps {
  value: number;
  onChange?: any;
  classes?: any;
}

@WithStyles(theme => ({
  root: {
    height: 27,
  },
}))
export default class FontSize extends React.PureComponent<IProps> {
  private defaultValue = 12;

  handleChange = (e: any) => {
    this.props.onChange({ fontSize: e.target.value });
  }

  render() {
    const { value, classes } = this.props;

    return (
      <FormControl>
        <Select
          value={value || this.defaultValue}
          onChange={this.handleChange}
          classes={classes}
          disabled={!value}
          displayEmpty
        >
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={14}>14</MenuItem>
          <MenuItem value={32}>32</MenuItem>
        </Select>
      </FormControl>
    );
  }
}