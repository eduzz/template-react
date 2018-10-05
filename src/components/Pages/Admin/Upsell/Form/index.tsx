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
// import Toast from 'components/Shared/Toast';
// import upsellService from 'services/upsell';
// import rxjsOperators from 'rxjs-operators';

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
  }

  componentWillMount() {
    const { id } = this.props.match.params;

    if (id) {
      // upsellService.getUpsell(id).pipe(
      //   rxjsOperators.loader(),
      //   rxjsOperators.logError(),
      //   rxjsOperators.bindComponent(this),
      // ).subscribe((upsell: any) => {
      //   this.setState({
      //     ...upsell,
      //   });
      // }, (error: any) => {
      //   Toast.error(error);
      //   this.props.history.push('/upsell');
      // });

      setTimeout(() => {
        this.setState(
          {
            id: 7,
            type: 2,
            content: 'dasdasdddsa',
            description: 'sdfasdfasdfasdfasdf',
            title: 'teste',
            highlight_image: 'https://offers.yext.com/hs-fs/hubfs/Googleheader.png?t=1536871620751&width=1840&name=Googleheader.png',
            small_image: 'https://doomwiki.org/w/images/thumb/4/46/Doom2016OSTCover.jpg/250px-Doom2016OSTCover.jpg',
            highlight: true,
            published: true,
            user_id: 141100,
            created_at: '2018-10-03 09:52:43.0000000',
            courses: [
              {
                id: 7300,
                title: 'Cruso para testar OnClickBy Nutror',
                course_page: true,
                upc_cod: 6,
                modules: [
                  {
                    id: 32738,
                    title: 'Modulo 1',
                    course_id: 7300,
                    lessons: [
                      {
                        id: 74081,
                        title: 'Aula 1',
                        module_id: 32738,
                        checked: true
                      },
                      {
                        id: 74082,
                        title: 'Aula 2',
                        module_id: 32738,
                        checked: true
                      }
                    ],
                    checked: true
                  },
                  {
                    id: 32739,
                    title: 'Modulo 2',
                    course_id: 7300,
                    lessons: [
                      {
                        id: 74083,
                        title: 'Aula 3',
                        module_id: 32739,
                        checked: false
                      }
                    ],
                    checked: false
                  }
                ]
              }
            ]
          } as any
        );
      }, 1000);
    }
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
    const { type, content, title, description, highlight_image, small_image, published, highlight } = this.state;

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
                      upsell={this.state}
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
                          image={highlight_image}
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