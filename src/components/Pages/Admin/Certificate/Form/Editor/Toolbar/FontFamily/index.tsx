import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

interface IProps {
  onChange?: any;
  value?: string;
}

export default class FontFamily extends React.PureComponent<IProps> {
  private defaultValue = 'Arial';
  private fontFamilyList = [
    'Arial',
    'Times New Roman',
    'Georgia',
    'Palatino Linotype',
    'Book Antiqua',
    'Times',
    'serif',
    'Helvetica',
    'Arial Black',
    'Gadget',
    'Comic Sans MS',
    'cursive',
    'Impact',
    'Charcoal',
    'Lucida Sans Unicode',
    'Lucida Grande',
    'Tahoma',
    'Geneva',
    'Trebuchet MS',
    'Helvetica',
    'Verdana',
    'sans-serif',
    'Courier New',
    'Courier',
    'Lucida Console',
    'Monaco',
    'monospace',
  ];

  handleChange = (e: any) => {
    this.props.onChange && this.props.onChange({ fontFamily: e.target.value });
  }

  render() {
    const { value } = this.props;

    return (
      <FormControl>
        <Select
          value={value || this.defaultValue}
          onChange={this.handleChange}
          disabled={!value}
          displayEmpty
        >
          {this.fontFamilyList.map((fontFamily: string, index: number) =>
            <MenuItem key={index} value={fontFamily}>
              <span style={{ fontFamily }}>{fontFamily}</span>
            </MenuItem>
          )}
        </Select>
      </FormControl>
    );
  }
}