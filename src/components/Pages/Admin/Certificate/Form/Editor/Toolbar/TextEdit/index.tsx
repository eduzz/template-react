import TextField from '@material-ui/core/TextField';
import React from 'react';

interface IProps {
  value?: string;
  onChange?: Function;
}

export default class TextEdit extends React.PureComponent<IProps> {
  handleChange = (e: any) => {
    this.props.onChange({ text: e.target.value });
  }

  render() {
    const { value } = this.props;

    return (
      <TextField
        value={value}
        onChange={this.handleChange}
      // disabled={!value}
      />
    );
  }
}