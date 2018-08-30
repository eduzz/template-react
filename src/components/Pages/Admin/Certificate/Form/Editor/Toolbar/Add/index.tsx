import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import FormatTextIcon from 'mdi-react/FormatTextIcon';

interface IProps {
  onClick?: any;
}

export default class Remove extends React.PureComponent<IProps> {
  handleClick = (e: any) => {
    this.props.onClick();
  }

  render() {
    return (
      <IconButton onClick={this.handleClick}>
        <FormatTextIcon />
      </IconButton>
    );
  }
}