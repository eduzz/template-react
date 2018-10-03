import { WithStyles } from 'decorators/withStyles';
import React, { ChangeEvent } from 'react';

interface IProps {
  classes?: any;
  value: string;
  onChange: (value: { color: string }) => void;
}

@WithStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: 45,
    margin: '0 8px 0 16px',
  }
})
export default class ColorPicker extends React.PureComponent<IProps> {
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange({ color: e.target.value });
  }

  render() {
    const { classes, value } = this.props;

    return (
      <div className={classes.root}>
        <input
          type='color'
          value={value}
          onChange={this.handleChange}
          disabled={!value}
        />
      </div>
    );
  }
}