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
import { WithRouter } from 'decorators/withRouter';
import Toast from 'components/Shared/Toast';
import upsellService from 'services/upsell';
import rxjsOperators from 'rxjs-operators';

interface IProps {
  classes?: any;
  match?: any;
  history?: any;
}

interface IState {
  type: number;
  content: string;
  published: boolean;
  highlight: boolean;
  title: string;
  courses: any;
  description: string;
  small_image: string | null;
  highlight_image: string | null;
}

@WithRouter()
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
      type: 1,
      content: '',
      published: true,
      highlight: false,
      title: '',
      courses: [],
      description: '',
      small_image: null,
      highlight_image: null,
    };

    const { id } = props.match.params;

    if (id) {
      upsellService.getUpsell(id).pipe(
        rxjsOperators.loader(),
        rxjsOperators.logError(),
        rxjsOperators.bindComponent(this),
      ).subscribe((upsell: any) => {
        this.setState({
          ...upsell,
        });
      }, (error: any) => {
        Toast.error(error);
        this.props.history.push('/upsell');
      });
    }
  }

  handleSubmit = (e: any) => {
    e.preventDefault();

    const { id } = this.props.match.params;

    if (id) {
      upsellService.edit(id, { ...this.state }).pipe(
        rxjsOperators.loader(),
        rxjsOperators.logError(),
        rxjsOperators.bindComponent(this),
      ).subscribe(() => {
        Toast.show('Upsell editado com sucesso!');
      }, (error: any) => {
        Toast.error(error);
      });
    } else {
      upsellService.save({ ...this.state }).pipe(
        rxjsOperators.loader(),
        rxjsOperators.logError(),
        rxjsOperators.bindComponent(this),
      ).subscribe(() => {
        Toast.show('Upsell criado com sucesso!');
        this.props.history.push('/upsell');
      }, (error: any) => {
        Toast.error(error);
      });
    }
  }

  handleChange = (state: any) => {
    this.setState(state);
  }

  render() {
    const { classes } = this.props;
    const { type, content, title, description, courses, highlight_image, small_image, published, highlight } = this.state;

    return (
      <Fragment>
        <Toolbar title='Upsell' />

        <Grid container justify='center'>
          <Grid item xs={12} lg={10}>
            <Paper className={classes.container}>
              <form onSubmit={this.handleSubmit}>
                <Grid container>
                  <Grid item xs={12} className={classes.section}>
                    <Type
                      type={type}
                      content={content}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.section}>
                    <Info
                      title={title}
                      description={description}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.section}>
                    <UpsellConfig
                      onChange={this.handleChange}
                      courses={courses}
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
                          label='highlight_image'
                          onChange={this.handleChange}
                          image={highlight_image}
                          disabled={!highlight}
                        />
                      </div>
                    </Grid>
                    <Grid item md={3}>
                      <div className={classes.imageContainer}>
                        <ImageUploader
                          width={250}
                          height={250}
                          label='small_image'
                          onChange={this.handleChange}
                          image={small_image}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <div className={classes.actions}>
                  <Actions
                    onChange={this.handleChange}
                    published={published}
                    highlight={highlight}
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