import TextField from '@material-ui/core/TextField';
import React, { ChangeEvent } from 'react';

interface IProps {
  value: string;
  onChange: (value: { text: string }) => void;
}

export default class TextEdit extends React.PureComponent<IProps> {
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange({ text: e.target.value });
  }

  render() {
    const { value } = this.props;

    return (
      <TextField
        value={value}
        onChange={this.handleChange}
      />
    );
  }
}