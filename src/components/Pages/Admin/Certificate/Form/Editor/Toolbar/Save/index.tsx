import IconButton from '@material-ui/core/IconButton';
import ContentSaveIcon from 'mdi-react/ContentSaveIcon';
import React from 'react';

interface IProps {
  onClick: () => void;
}

export default class Save extends React.PureComponent<IProps> {
  render() {
    const { onClick } = this.props;

    return (
      <IconButton onClick={onClick}>
        <ContentSaveIcon />
      </IconButton>
    );
  }
}