import React, { Fragment } from 'react';
import Toolbar from 'components/Layout/Toolbar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { WithStyles } from 'decorators/withStyles';
import Type from './Type';
import Info from './Info';
import ImageUploader from './ImageUploader';
import Actions from './Actions';
import UpsellConfig from './UpsellConfig';

interface IProps {
  classes?: any;
}

interface IState {
  type: any;
  published: boolean;
  highlight: boolean;
  title: string;
  description: string;
  smallImage: string | null;
  highlightImage: string | null;
}

@WithStyles(theme => ({
  container: {
    padding: 16,
    // maxWidth: 1000,
  },
  section: {
    paddingBottom: 24,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
  imageUploadArea: {
    display: 'flex',
  },
  imageContainer: {
    paddingTop: 27,
  },
  highlightImageContainer: {
    paddingTop: 8,
    marginRight: 16,
  },
}))
export default class Form extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      type: 'nutror',
      published: true,
      highlight: false,
      title: '',
      description: '',
      smallImage: null,
      highlightImage: null,
    };
  }

  handleSubmit = (e: any) => {
    e.preventDefault();

    console.log(JSON.stringify(this.state));
  }

  handleChange = (state: any) => {
    this.setState(state);
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Toolbar title='Upsell' />

        <Grid container justify='center'>
          <Grid item xs={12} lg={10}>
            <Paper className={classes.container}>
              <form onSubmit={this.handleSubmit}>
                <Grid container>
                  <Grid item xs={12} className={classes.section}>
                    <Type onChange={this.handleChange} />
                  </Grid>
                  <Grid item xs={12} className={classes.section}>
                    <Info onChange={this.handleChange} />
                  </Grid>
                  <Grid item xs={12} className={classes.section}>
                    <UpsellConfig
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid container className={`${classes.section} ${classes.imageUploadArea}`}>
                    <Grid item xs={12} md={9}>
                      <label className={classes.imageLabel}>
                        Selecione as Imagens
                      </label>
                      <div className={classes.highlightImageContainer}>
                        <ImageUploader
                          width={1840}
                          height={460}
                          label='highlightImage'
                          onChange={this.handleChange}
                        />
                      </div>
                    </Grid>
                    <Grid item md={3}>
                      <div className={classes.imageContainer}>
                        <ImageUploader
                          width={250}
                          height={250}
                          label='smallImage'
                          onChange={this.handleChange}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <div className={classes.actions}>
                  <Actions
                    onChange={this.handleChange}
                  />
                </div>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}