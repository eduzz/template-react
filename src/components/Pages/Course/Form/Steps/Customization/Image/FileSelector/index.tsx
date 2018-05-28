import { Button, CircularProgress } from '@material-ui/core';
import { WithStyles } from 'decorators/withStyles';
import { FolderIcon } from 'mdi-react';
import React, { Fragment, PureComponent } from 'react';

interface IState {
  loading: boolean;
}

interface IProps {
  onLoad: (url: string) => void;
  classes?: any;
}

@WithStyles({
  progress: {
    marginRight: 5
  }
})
export default class FileSelector extends PureComponent<IProps, IState> {
  inputRef: HTMLInputElement;

  constructor(props: IProps) {
    super(props);
    this.state = { loading: false };
  }

  handleSelectImage() {
    this.inputRef.click();
  }

  onFileSelected() {
    if (!this.inputRef.files.length) return;

    this.setState({ loading: true });

    const file = this.inputRef.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      this.props.onLoad(e.target.result);
      setTimeout(() => this.setState({ loading: false }), 1000);
    };

    reader.readAsDataURL(file);
  }

  render() {
    const { loading } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <input
          type='file'
          ref={ref => this.inputRef = ref}
          className='hide'
          onChange={this.onFileSelected.bind(this)}
        />

        <Button color='secondary' disabled={loading} onClick={this.handleSelectImage.bind(this)}>
          {loading ? <CircularProgress className={classes.progress} size={20} /> : <FolderIcon />}
          {loading ? 'Carregando' : 'Selecionar Arquivo'}
        </Button>
      </Fragment>
    );
  }
}