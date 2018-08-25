import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ContentSaveIcon from 'mdi-react/ContentSaveIcon';

interface IProps {
  onClick?: any;
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