import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import Toolbar from 'components/Layout/Toolbar';
import ImageSelector from 'components/Shared/ImageSelector';
import { WithStyles } from 'decorators/withStyles';
import React, { Fragment, PureComponent } from 'react';

interface IState {
  selectorOpened: boolean;
  image?: string;
}

interface IProps {
  classes?: any;
}

@WithStyles(theme => ({
  img: {
    maxWidth: '100%',
    margin: 'auto',
    display: 'block',
    padding: 5,
    boxShadow: theme.shadows['5']
  },
  cardActions: {
    justifyContent: 'flex-end'
  }
}))
export default class ExtraIndexPage extends PureComponent<IProps, IState> {
  constructor(props: {}) {
    super(props);
    this.state = { selectorOpened: false };
  }

  openSelector = () => {
    this.setState({ selectorOpened: true });
  }

  onSelectorComplete = (image: string) => {
    this.setState({ image, selectorOpened: false });
  }

  render() {
    const { selectorOpened, image } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <ImageSelector
          opened={selectorOpened}
          width={500}
          height={500}
          onComplete={this.onSelectorComplete}
        />

        <Toolbar title='Extra' />

        <Card>
          <CardContent>
            <Typography variant='subheading' gutterBottom>Image Cropper + Compressor</Typography>
            {!!image && <img className={classes.img} src={image} />}
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button onClick={this.openSelector} variant='raised' color='secondary'>
              Selecionar
            </Button>
          </CardActions>

        </Card>

      </Fragment>
    );
  }
}
