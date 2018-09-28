import IconButton from '@material-ui/core/IconButton';
import FormatTextIcon from 'mdi-react/FormatTextIcon';
import React from 'react';

interface IProps {
  onClick: () => void;
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