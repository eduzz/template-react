import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { WithStyles } from 'decorators/withStyles';
import React from 'react';

import { DEFAULT_FONT_SIZE } from '../../config';

interface IProps {
  value: number;
  onChange?: (value: { fontSize: number }) => void;
  classes?: any;
}

@WithStyles(theme => ({
  root: {
    marginRight: 8,
  },
}))
export default class FontSize extends React.PureComponent<IProps> {
  handleChange = (e: any) => {
    this.props.onChange({ fontSize: e.target.value });
  }

  render() {
    const { value, classes } = this.props;

    return (
      <FormControl className={classes.root}>
        <Select
          value={value || DEFAULT_FONT_SIZE}
          onChange={this.handleChange}
          disabled={!value}
          displayEmpty
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={14}>14</MenuItem>
          <MenuItem value={14}>20</MenuItem>
          <MenuItem value={14}>26</MenuItem>
          <MenuItem value={32}>32</MenuItem>
          <MenuItem value={36}>36</MenuItem>
          <MenuItem value={64}>64</MenuItem>
          <MenuItem value={72}>72</MenuItem>
          <MenuItem value={84}>84</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={150}>150</MenuItem>
        </Select>
      </FormControl>
    );
  }
}