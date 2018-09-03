import React from 'react';
import FormatAlignCenterIcon from 'mdi-react/FormatAlignCenterIcon';
import FormatAlignLeftIcon from 'mdi-react/FormatAlignLeftIcon';
import FormatAlignRightIcon from 'mdi-react/FormatAlignRightIcon';
import { WithStyles } from 'decorators/withStyles';
import IconButton from '@material-ui/core/IconButton';

interface IProps {
  value: string;
  onChange?: any;
  classes?: any;
}

@WithStyles(theme => ({
  root: {},
  selected: {
    color: '#00b768',
  },
}))
export default class HorizontalAlignment extends React.PureComponent<IProps> {
  handleCenter = () => {
    this.props.onChange({ justifyContent: 'center' });
  }

  handleLeft = () => {
    this.props.onChange({ justifyContent: 'flex-start' });
  }

  handleRight = () => {
    this.props.onChange({ justifyContent: 'flex-end' });
  }

  render() {
    const { classes, value } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          className={value === 'flex-start' ? classes.selected : ''}
          onClick={this.handleLeft}
          disabled={!value}
        >
          <FormatAlignLeftIcon />
        </IconButton>
        <IconButton
          className={value === 'center' ? classes.selected : ''}
          onClick={this.handleCenter}
          disabled={!value}
        >
          <FormatAlignCenterIcon />
        </IconButton>
        <IconButton
          className={value === 'flex-end' ? classes.selected : ''}
          onClick={this.handleRight}
          disabled={!value}
        >
          <FormatAlignRightIcon />
        </IconButton>
      </div>
    );
  }
}