import React, { Fragment } from 'react';
import Toolbar from 'components/Layout/Toolbar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { WithStyles } from 'decorators/withStyles';
import Type from './Type';
import Form from './Form';
import TreeView from './TreeView';
import ImageUploader from './ImageUploader';
import Actions from './Actions';
import CourseSelect from './CourseSelect';

interface IProps {
  classes?: any;
}

interface IState {
  type: any;
  published: boolean;
  featured: boolean;
  title: string;
  description: string;
  image: string;
  highlightImage: string;
}

@WithStyles(theme => ({
  container: {
    padding: 16,
    // maxWidth: 1000,
  },
  section: {
    paddingBottom: 24,
  },
  treeViewLabel: {
    fontSize: 18,
  },
  treeViewContainer: {
    padding: 16,
    marginTop: 16,
  },
  treeViewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
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
export default class Upsell extends React.PureComponent<IProps, IState> {
  private default = [
    {
      title: 'A Virada da Chave',
      children: [
        {
          title: 'Modulo 1',
          children: [
            {
              title: 'Aula 1',
            },
            {
              title: 'Aula 2',
            },
            {
              title: 'Aula 3',
            },
          ]
        },
        {
          title: 'Modulo 2',
          children: [
            {
              title: 'Aula 1',
            },
            {
              title: 'Aula 2',
            },
            {
              title: 'Aula 3',
            },
          ]
        },
      ],
    },
  ];

  constructor(props: IProps) {
    super(props);

    this.state = {
      type: 'nutror',
      published: true,
      featured: false,
      title: '',
      description: '',
      image: '',
      highlightImage: '',
    };
  }

  handleSubmit = (e: any) => {
    e.preventDefault();

    console.log(this.state);
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
                    <Form onChange={this.handleChange} />
                  </Grid>
                  <Grid item xs={12} className={classes.section}>
                    <div className={classes.treeViewHeader}>
                      <label className={classes.treeViewLabel}>
                        Onde você quer aplicar?
                      </label>
                      <CourseSelect />
                    </div>
                    <Paper className={classes.treeViewContainer}>
                      <TreeView
                        defaultValue={this.default}
                        onChange={this.handleChange}
                      />
                    </Paper>
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
                          label='image'
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