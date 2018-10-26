import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Toast from 'components/Shared/Toast';
import React, { Fragment } from 'react';
import rxjsOperators from 'rxjs-operators';
import upsellService from 'services/upsell';

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
  offer_shelf: boolean;
  title: string;
  courses: any;
  description: string;
  small_image: string | null;
  highlight_image: string | null;
  isValid: boolean;
}

export default class Form extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      type: 1,
      content: '',
      published: true,
      highlight: false,
      offer_shelf: false,
      title: '',
      courses: [],
      description: '',
      small_image: null,
      highlight_image: null,
      isValid: true,
    };

    //const { id } = props.match.params;

    /* if (id) {
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
    } */
  }

  getValidStatus = () => {
    const { content, title, description, small_image, highlight, highlight_image } = this.state;
    const status = Boolean(content && title && description && small_image && (!highlight || highlight_image));

    this.setState({
      isValid: status,
    });

    return status;
  }

  handleSubmit = (e: any) => {
    e.preventDefault();

    if (!this.getValidStatus()) return;

    const { id } = this.props.match.params;
    const params = {
      ...this.state,
      content: this.state.content.toString(),
    };

    if (id) {
      upsellService.edit(id, params).pipe(
        rxjsOperators.loader(),
        rxjsOperators.logError(),
        rxjsOperators.bindComponent(this),
      ).subscribe(() => {
        Toast.show('Upsell editado com sucesso!');
      }, (error: any) => {
        Toast.error(error);
      });
    } else {
      upsellService.save(params).pipe(
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
    //const { classes } = this.props;
    //const { type, content, title, description, courses, highlight_image, small_image, published, highlight, offer_shelf, isValid } = this.state;

    return (
      <Fragment>
        <Grid container justify='center'>
          <Grid item xs={12} lg={10}>
            <Paper>
              <form onSubmit={this.handleSubmit}>
                <Grid container>
                  <Grid item xs={12}>
                    teste
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}