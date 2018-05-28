import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@material-ui/core';
import { WithStyles } from 'decorators/withStyles';
import React, { PureComponent } from 'react';
import { Cropper } from 'react-image-cropper';

import FileSelector from './FileSelector';

interface IProps {
  width: number;
  height: number;
  classes?: any;
}

@WithStyles({
  imageContainer: {
    background: '#ededed',
  },
  content: {
    overflow: 'auto',
    maxHeight: 'calc(100vh - 140px) !important'
  }
})
export default class ImageSelector extends PureComponent<IProps> {

  render() {
    const { width, height, classes } = this.props;

    return (
      <Dialog
        open={true}
        maxWidth='md'
        disableBackdropClick
        disableEscapeKeyDown
        TransitionComponent={Transition}>

        <DialogTitle>Selecionar Imagem</DialogTitle>
        <DialogContent className={classes.content}>

          <Cropper
            src='https://picsum.photos/1000/400'
            ratio={width / height}
            width={width}
            height={height}
            allowNewSelection={false}
            styles={{
              source_img: {
                WebkitFilter: 'blur(3.5px)',
                filter: 'blur(3.5px)'
              },
              modal: {
                opacity: 0.5,
                backgroundColor: '#fff'
              },
              dotInner: {
                borderColor: '#ff0000'
              },
              dotInnerCenterVertical: {
                backgroundColor: '#ff0000'
              },
              dotInnerCenterHorizontal: {
                backgroundColor: '#ff0000'
              }
            }}
          />

        </DialogContent>
        <DialogActions>
          <FileSelector onLoad={url => console.log(url)} />

          <Button>Cancelar</Button>
          <Button color='secondary'>Salvar</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}