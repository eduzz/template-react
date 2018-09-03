import React from 'react';
import { WithStyles } from 'decorators/withStyles';

interface IProps {
  classes?: any;
  value?: string;
  onChange?: Function;
}

interface IState {
  value: string;
}

@WithStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: 45,
    margin: '0 8px 0 16px',
  },
}))
export default class ColorPicker extends React.PureComponent<IProps, IState> {
  handleChange = (e: any) => {
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