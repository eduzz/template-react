import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import FormatTextIcon from 'mdi-react/FormatTextIcon';

interface IProps {
  onClick?: any;
}

export default class Remove extends React.PureComponent<IProps> {
  render() {
    const { onClick } = this.props;

    return (
      <IconButton onClick={onClick}>
        <FormatTextIcon />
      </IconButton>
    );
  }
}