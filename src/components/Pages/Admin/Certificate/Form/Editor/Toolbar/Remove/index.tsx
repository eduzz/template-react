import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from 'mdi-react/DeleteIcon';
import React from 'react';

interface IProps {
  onClick: () => void;
  disabled: boolean;
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