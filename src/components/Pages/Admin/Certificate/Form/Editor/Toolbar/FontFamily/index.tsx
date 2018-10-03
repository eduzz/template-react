import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { WithStyles } from 'decorators/withStyles';
import React, { ChangeEvent } from 'react';

import { DEFAULT_FONT, FONTS } from '../../config';

interface IProps {
  value: string;
  onChange: (value: { fontFamily: string }) => void;
  classes?: any;
}

@WithStyles({
  root: {
    width: 150,
    height: 46
  }
})
export default class FontFamily extends React.PureComponent<IProps> {

  handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    this.props.onChange({ fontFamily: e.target.value });
  }

  render() {
    const { value, classes } = this.props;

    return (
      <FormControl className={classes.root}>
        <Select
          value={value || DEFAULT_FONT}
          onChange={this.handleChange}
          disabled={!value}
          displayEmpty
        >
          {FONTS.map((fontFamily: string, index: number) =>
            <MenuItem key={index} value={fontFamily}>
              <span style={{ fontFamily }}>{fontFamily}</span>
            </MenuItem>
          )}
        </Select>
      </FormControl>
    );
  }
}