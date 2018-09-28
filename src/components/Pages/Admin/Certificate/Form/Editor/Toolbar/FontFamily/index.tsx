import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React from 'react';

import { DEFAULT_FONT, FONTS } from '../../config';

interface IProps {
  value: string;
  onChange: (value: { fontFamily: string }) => void;
}

export default class FontFamily extends React.PureComponent<IProps> {

  handleChange = (e: any) => {
    this.props.onChange({ fontFamily: e.target.value });
  }

  render() {
    const { value } = this.props;

    return (
      <FormControl>
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