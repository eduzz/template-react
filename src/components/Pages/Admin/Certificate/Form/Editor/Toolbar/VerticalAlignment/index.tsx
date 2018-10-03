import IconButton from '@material-ui/core/IconButton';
import { WithStyles } from 'decorators/withStyles';
import FormatVerticalAlignBottomIcon from 'mdi-react/FormatVerticalAlignBottomIcon';
import FormatVerticalAlignCenterIcon from 'mdi-react/FormatVerticalAlignCenterIcon';
import FormatVerticalAlignTopIcon from 'mdi-react/FormatVerticalAlignTopIcon';
import React from 'react';

interface IProps {
  value: string;
  onChange: (value: { alignItems: string }) => void;
  classes?: any;
}

@WithStyles({
  selected: {
    color: '#00b768',
  },
})
export default class VerticalAlignment extends React.PureComponent<IProps> {
  handleCenter = () => {
    this.props.onChange({ alignItems: 'center' });
  }

  handleLeft = () => {
    this.props.onChange({ alignItems: 'flex-start' });
  }

  handleRight = () => {
    this.props.onChange({ alignItems: 'flex-end' });
  }

  render() {
    const { classes, value } = this.props;

    return (
      <div>
        <IconButton
          className={value === 'flex-start' ? classes.selected : ''}
          onClick={this.handleLeft}
          disabled={!value}
        >
          <FormatVerticalAlignTopIcon />
        </IconButton>
        <IconButton
          className={value === 'center' ? classes.selected : ''}
          onClick={this.handleCenter}
          disabled={!value}
        >
          <FormatVerticalAlignCenterIcon />
        </IconButton>
        <IconButton
          className={value === 'flex-end' ? classes.selected : ''}
          onClick={this.handleRight}
          disabled={!value}
        >
          <FormatVerticalAlignBottomIcon />
        </IconButton>
      </div>
    );
  }
}