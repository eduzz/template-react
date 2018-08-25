import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from 'mdi-react/DeleteIcon';

interface IProps {
  onClick?: any;
  disabled?: boolean;
}

export default class Remove extends React.PureComponent<IProps> {
  render() {
    const { onClick, disabled } = this.props;

    return (
      <IconButton disabled={disabled} onClick={onClick}>
        <DeleteIcon />
      </IconButton>
    );
  }
}